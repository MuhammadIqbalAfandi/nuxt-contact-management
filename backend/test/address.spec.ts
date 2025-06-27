import { INestApplication, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { AppModule } from '../src/app.module';
import { TestService } from './test.service';
import { TestModule } from './test.module';
import { WebResponse } from '../src/model/Web.model';
import { AddressResponse } from '../src/model/Address.model';

describe('AddressController', () => {
  let app: INestApplication;
  let logger: Logger;
  let testService: TestService;

  beforeEach(async (): Promise<void> => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    logger = app.get(WINSTON_MODULE_PROVIDER);
    testService = app.get(TestService);
  });

  describe('POST /api/contacts/:contactsId/addresses', () => {
    beforeEach(async () => {
      await testService.deleteAll();
      await testService.createUser();
      await testService.createContact();
    });

    it('should be rejected if request is invalid', async () => {
      const contact = await testService.getContact();

      if (!contact) {
        throw new NotFoundException('Contact not found');
      }

      const response = await request(app.getHttpServer())
        .post(`/api/contacts/${contact.id}/addresses`)
        .set('Authorization', 'test')
        .send({
          street: '',
          city: '',
          province: '',
          country: '',
          postal_code: '',
        });

      logger.info(response.body);

      const body = response.body as WebResponse<AddressResponse>;

      expect(response.status).toBe(400);
      expect(body.errors).toBeDefined();
    });

    it('should be able to create address', async () => {
      const contact = await testService.getContact();

      if (!contact) {
        throw new NotFoundException('Contact not found');
      }

      const response = await request(app.getHttpServer())
        .post(`/api/contacts/${contact.id}/addresses`)
        .set('Authorization', 'test')
        .send({
          street: 'test street',
          city: 'test city',
          province: 'test province',
          country: 'test country',
          postal_code: '1111',
        });

      logger.info(response.body);

      const body = response.body as WebResponse<AddressResponse>;

      expect(response.status).toBe(200);
      expect(body.data?.id).toBeDefined();
      expect(body.data?.street).toBe('test street');
      expect(body.data?.city).toBe('test city');
      expect(body.data?.province).toBe('test province');
      expect(body.data?.country).toBe('test country');
      expect(body.data?.postal_code).toBe('1111');
    });
  });

  describe('GET /api/contacts/:contactsId/addresses/:addressId', () => {
    beforeEach(async () => {
      await testService.deleteAll();
      await testService.createUser();
      await testService.createContact();
      await testService.createAddress();
    });

    it('should be rejected if contact not found', async () => {
      const contact = await testService.getContact();

      if (!contact) {
        throw new NotFoundException('Contact not found');
      }

      const address = await testService.getAddress();

      if (!address) {
        throw new NotFoundException('Address not found');
      }

      const response = await request(app.getHttpServer())
        .get(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
        .set('Authorization', 'test');

      logger.info(response.body);

      const body = response.body as WebResponse<AddressResponse>;

      expect(response.status).toBe(404);
      expect(body.errors).toBeDefined();
    });

    it('should be able to get address', async () => {
      const contact = await testService.getContact();

      if (!contact) {
        throw new NotFoundException('Contact not found');
      }

      const address = await testService.getAddress();

      if (!address) {
        throw new NotFoundException('Address not found');
      }

      const response = await request(app.getHttpServer())
        .get(`/api/contacts/${contact.id}/addresses/${address.id}`)
        .set('Authorization', 'test');

      logger.info(response.body);

      const body = response.body as WebResponse<AddressResponse>;

      expect(response.status).toBe(200);
      expect(body.data?.id).toBeDefined();
      expect(body.data?.street).toBe('test street');
      expect(body.data?.city).toBe('test city');
      expect(body.data?.province).toBe('test province');
      expect(body.data?.country).toBe('test country');
      expect(body.data?.postal_code).toBe('1111');
    });
  });

  describe('PUT /api/contacts/:contactsId/addresses/:addressId', () => {
    beforeEach(async () => {
      await testService.deleteAll();
      await testService.createUser();
      await testService.createContact();
      await testService.createAddress();
    });

    it('should be rejected if request is invalid', async () => {
      const contact = await testService.getContact();

      if (!contact) {
        throw new NotFoundException('Contact not found');
      }

      const address = await testService.getAddress();

      if (!address) {
        throw new NotFoundException('Address not found');
      }

      const response = await request(app.getHttpServer())
        .put(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
        .set('Authorization', 'test')
        .send({
          street: '',
          city: '',
          province: '',
          country: '',
          postal_code: '',
        });

      logger.info(response.body);

      const body = response.body as WebResponse<AddressResponse>;

      expect(response.status).toBe(400);
      expect(body.errors).toBeDefined();
    });

    it('should be able to update address', async () => {
      const contact = await testService.getContact();

      if (!contact) {
        throw new NotFoundException('Contact not found');
      }

      const address = await testService.getAddress();

      if (!address) {
        throw new NotFoundException('Address not found');
      }

      const response = await request(app.getHttpServer())
        .put(`/api/contacts/${contact.id}/addresses/${address.id}`)
        .set('Authorization', 'test')
        .send({
          street: 'test street',
          city: 'test city',
          province: 'test province',
          country: 'test country',
          postal_code: '1111',
        });

      logger.info(response.body);

      const body = response.body as WebResponse<AddressResponse>;

      expect(response.status).toBe(200);
      expect(body.data?.id).toBeDefined();
      expect(body.data?.street).toBe('test street');
      expect(body.data?.city).toBe('test city');
      expect(body.data?.province).toBe('test province');
      expect(body.data?.country).toBe('test country');
      expect(body.data?.postal_code).toBe('1111');
    });

    it('should be rejected if contact is not found', async () => {
      const contact = await testService.getContact();

      if (!contact) {
        throw new NotFoundException('Contact not found');
      }

      const address = await testService.getAddress();

      if (!address) {
        throw new NotFoundException('Address not found');
      }

      const response = await request(app.getHttpServer())
        .put(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
        .set('Authorization', 'test')
        .send({
          street: 'test street',
          city: 'test city',
          province: 'test province',
          country: 'test country',
          postal_code: '1111',
        });

      logger.info(response.body);

      const body = response.body as WebResponse<AddressResponse>;

      expect(response.status).toBe(404);
      expect(body.errors).toBeDefined();
    });

    it('should be rejected if address is not found', async () => {
      const contact = await testService.getContact();

      if (!contact) {
        throw new NotFoundException('Contact not found');
      }

      const address = await testService.getAddress();

      if (!address) {
        throw new NotFoundException('Address not found');
      }

      const response = await request(app.getHttpServer())
        .put(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
        .set('Authorization', 'test')
        .send({
          street: 'test street',
          city: 'test city',
          province: 'test province',
          country: 'test country',
          postal_code: '1111',
        });

      logger.info(response.body);

      const body = response.body as WebResponse<AddressResponse>;

      expect(response.status).toBe(404);
      expect(body.errors).toBeDefined();
    });
  });

  describe('DELETE /api/contacts/:contactsId/addresses/:addressId', () => {
    beforeEach(async () => {
      await testService.deleteAll();
      await testService.createUser();
      await testService.createContact();
      await testService.createAddress();
    });

    it('should be rejected if contact not found', async () => {
      const contact = await testService.getContact();

      if (!contact) {
        throw new NotFoundException('Contact not found');
      }

      const address = await testService.getAddress();

      if (!address) {
        throw new NotFoundException('Address not found');
      }

      const response = await request(app.getHttpServer())
        .delete(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
        .set('Authorization', 'test');

      logger.info(response.body);

      const body = response.body as WebResponse<AddressResponse>;

      expect(response.status).toBe(404);
      expect(body.errors).toBeDefined();
    });

    it('should be to delete address', async () => {
      const contact = await testService.getContact();

      if (!contact) {
        throw new NotFoundException('Contact not found');
      }

      const address = await testService.getAddress();

      if (!address) {
        throw new NotFoundException('Address not found');
      }

      const response = await request(app.getHttpServer())
        .delete(`/api/contacts/${contact.id}/addresses/${address.id}`)
        .set('Authorization', 'test');

      logger.info(response.body);

      const body = response.body as WebResponse<AddressResponse>;

      expect(response.status).toBe(200);
      expect(body.data).toBe(true);

      const addressResult = await testService.getAddress();
      expect(addressResult).toBeNull();
    });
  });

  describe('GET /api/contacts/:contactsId/addresses/:addressId', () => {
    beforeEach(async () => {
      await testService.deleteAll();
      await testService.createUser();
      await testService.createContact();
      await testService.createAddress();
    });

    it('should be rejected if contact not found', async () => {
      const contact = await testService.getContact();

      if (!contact) {
        throw new NotFoundException('Contact not found');
      }

      const address = await testService.getAddress();

      if (!address) {
        throw new NotFoundException('Address not found');
      }

      const response = await request(app.getHttpServer())
        .get(`/api/contacts/${contact.id + 1}/addresses`)
        .set('Authorization', 'test');

      logger.info(response.body);

      const body = response.body as WebResponse<AddressResponse>;

      expect(response.status).toBe(404);
      expect(body.errors).toBeDefined();
    });

    it('should be able to list address', async () => {
      const contact = await testService.getContact();

      if (!contact) {
        throw new NotFoundException('Contact not found');
      }

      const address = await testService.getAddress();

      if (!address) {
        throw new NotFoundException('Address not found');
      }

      const response = await request(app.getHttpServer())
        .get(`/api/contacts/${contact.id}/addresses`)
        .set('Authorization', 'test');

      logger.info(response.body);

      const body = response.body as WebResponse<AddressResponse[]>;

      expect(response.status).toBe(200);
      expect(body.data).toBeDefined();
      expect(body.data!.length).toBe(1);
      expect(body.data![0]?.id).toBeDefined();
      expect(body.data![0]?.street).toBe('test street');
      expect(body.data![0]?.city).toBe('test city');
      expect(body.data![0]?.province).toBe('test province');
      expect(body.data![0]?.country).toBe('test country');
      expect(body.data![0]?.postal_code).toBe('1111');
    });
  });
});
