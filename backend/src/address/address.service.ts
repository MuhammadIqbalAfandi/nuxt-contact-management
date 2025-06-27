import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ValidationService } from '../common/validation.service';
import { Logger } from 'winston';
import { PrismaService } from '../common/prisma.service';
import {
  AddressResponse,
  CreateAddressRequest,
  GetAddressRequest,
  RemoveAddressRequest,
  UpdateAddressRequest,
} from '../model/Address.model';
import { Address, User } from '@prisma/client';
import { AddressValidation } from './address.validation';
import { ContactService } from '../contact/contact.service';

@Injectable()
export class AddressService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
    private validationService: ValidationService,
    private contactService: ContactService,
  ) {}

  async create(
    user: User,
    request: CreateAddressRequest,
  ): Promise<AddressResponse> {
    this.logger.debug(
      `Address.Service.create(${JSON.stringify(user)}, ${JSON.stringify(request)})`,
    );

    const createRequest: CreateAddressRequest =
      this.validationService.validate<CreateAddressRequest>(
        AddressValidation.CREATE,
        request,
      );

    await this.contactService.checkContactMustExist(
      user.username,
      createRequest.contact_id,
    );

    const address = await this.prismaService.address.create({
      data: createRequest,
    });

    return {
      id: address.id,
      street: address.street ?? undefined,
      city: address.city ?? undefined,
      province: address.province ?? undefined,
      country: address.country,
      postal_code: address.postal_code,
    };
  }

  toAddressResponse(address: Address): AddressResponse {
    return {
      id: address.id,
      street: address.street ?? undefined,
      city: address.city ?? undefined,
      province: address.province || undefined,
      country: address.country,
      postal_code: address.postal_code,
    };
  }

  async checkAddressMustExists(
    contactId: number,
    addressId: number,
  ): Promise<Address> {
    this.logger.debug(
      `Address.Service.checkAddressMustExists: ${JSON.stringify(contactId)}, ${JSON.stringify(addressId)}`,
    );

    const address = await this.prismaService.address.findFirst({
      where: {
        id: addressId,
        contact_id: contactId,
      },
    });

    if (!address) {
      throw new NotFoundException('Address not found');
    }

    return address;
  }

  async get(user: User, request: GetAddressRequest): Promise<AddressResponse> {
    const getRequest = this.validationService.validate<GetAddressRequest>(
      AddressValidation.GET,
      request,
    );

    await this.contactService.checkContactMustExist(
      user.username,
      getRequest.contact_id,
    );

    const address = await this.checkAddressMustExists(
      getRequest.contact_id,
      getRequest.address_id,
    );

    if (!address) {
      throw new NotFoundException('Address not found');
    }

    return this.toAddressResponse(address);
  }

  async update(
    user: User,
    request: UpdateAddressRequest,
  ): Promise<AddressResponse> {
    this.logger.debug(
      `Address.Service.update(${JSON.stringify(user)}, ${JSON.stringify(request)})`,
    );

    const updateRequest = this.validationService.validate<UpdateAddressRequest>(
      AddressValidation.UPDATE,
      request,
    );

    await this.contactService.checkContactMustExist(
      user.username,
      updateRequest.contact_id,
    );

    let address = await this.checkAddressMustExists(
      updateRequest.contact_id,
      updateRequest.id,
    );

    address = await this.prismaService.address.update({
      where: {
        id: address.id,
        contact_id: address.contact_id,
      },
      data: updateRequest,
    });

    return this.toAddressResponse(address);
  }

  async remove(
    user: User,
    request: RemoveAddressRequest,
  ): Promise<AddressResponse> {
    this.logger.debug(
      `Address.Service.remove(${JSON.stringify(user)}, ${JSON.stringify(request)})`,
    );

    const removeRequest = this.validationService.validate<RemoveAddressRequest>(
      AddressValidation.REMOVE,
      request,
    );

    await this.contactService.checkContactMustExist(
      user.username,
      removeRequest.contact_id,
    );

    await this.checkAddressMustExists(
      removeRequest.contact_id,
      removeRequest.address_id,
    );

    const address = await this.prismaService.address.delete({
      where: {
        id: removeRequest.address_id,
        contact_id: removeRequest.contact_id,
      },
    });

    return this.toAddressResponse(address);
  }

  async list(user: User, contactId: number): Promise<AddressResponse[]> {
    await this.contactService.checkContactMustExist(user.username, contactId);
    const addresses = await this.prismaService.address.findMany({
      where: {
        contact_id: contactId,
      },
    });

    if (!addresses) {
      throw new NotFoundException('Address not found');
    }

    return addresses.length > 0
      ? addresses.map(address => this.toAddressResponse(address))
      : [];
  }
}
