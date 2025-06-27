import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { ContactService } from '../contact/contact.service';

@Module({
  providers: [AddressService, ContactService],
  controllers: [AddressController],
})
export class AddressModule {}
