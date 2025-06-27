import { INestApplication, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { AppModule } from '../src/app.module';
import { TestService } from './test.service';
import { TestModule } from './test.module';
import { WebResponse } from '../src/model/Web.model';
import { ContactResponse } from '../src/model/contact.model';

describe('ContactController', () => {
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

  describe('POST /api/contacts', () => {
    beforeEach(async () => {
      await testService.deleteAll();
      await testService.createUser();
      await testService.createContact();
    });

    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/contacts')
        .set('Authorization', 'test')
        .send({
          first_name: '',
          last_name: '',
          email: 'wrong',
          phone: '',
        });

      logger.info(response.body);

      const body = response.body as WebResponse<ContactResponse>;

      expect(response.status).toBe(400);
      expect(body.errors).toBeDefined();
    });

    it('should be able to create contact', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/contacts')
        .set('Authorization', 'test')
        .send({
          first_name: 'test',
          last_name: 'test',
          email: 'test@example.com',
          phone: '9999',
        });

      logger.info(response.body);

      const body = response.body as WebResponse<ContactResponse>;

      expect(response.status).toBe(200);
      expect(body.data?.first_name).toBe('test');
      expect(body.data?.last_name).toBe('test');
      expect(body.data?.email).toBe('test@example.com');
      expect(body.data?.phone).toBe('9999');
    });
  });

  describe('GET /api/contacts/:contactId', () => {
    beforeEach(async () => {
      await testService.deleteAll();
      await testService.createUser();
      await testService.createContact();
    });

    it('should be rejected if contact is not found', async () => {
      const contact = await testService.getContact();

      if (!contact?.id) {
        throw new NotFoundException('Contact not found');
      }

      const response = await request(app.getHttpServer())
        .get(`/api/contacts/${contact.id + 1}`)
        .set('Authorization', 'test');

      logger.info(response.body);

      const body = response.body as WebResponse<ContactResponse>;

      expect(response.status).toBe(404);
      expect(body.errors).toBeDefined();
    });

    it('should be able to get contact', async () => {
      const contact = await testService.getContact();

      if (!contact?.id) {
        throw new NotFoundException('Contact not found');
      }

      const response = await request(app.getHttpServer())
        .get(`/api/contacts/${contact.id}`)
        .set('Authorization', 'test');

      logger.info(response.body);

      const body = response.body as WebResponse<ContactResponse>;

      expect(response.status).toBe(200);
      expect(body.data?.first_name).toBe('test');
      expect(body.data?.last_name).toBe('test');
      expect(body.data?.email).toBe('test@example.com');
      expect(body.data?.phone).toBe('9999');
    });
  });

  describe('PUT /api/contacts/:contactId', () => {
    beforeEach(async () => {
      await testService.deleteAll();

      await testService.createUser();
      await testService.createContact();
    });

    it('should be rejected if contact is invalid', async () => {
      const contact = await testService.getContact();

      if (!contact?.id) {
        throw new NotFoundException('Contact not found');
      }

      const response = await request(app.getHttpServer())
        .put(`/api/contacts/${contact.id}`)
        .set('Authorization', 'test')
        .send({
          first_name: '',
          last_name: '',
          email: 'wrong',
          phone: '',
        });

      logger.info(response.body);

      const body = response.body as WebResponse<ContactResponse>;

      expect(response.status).toBe(400);
      expect(body.errors).toBeDefined();
    });

    it('should be rejected if contact is no found', async () => {
      const contact = await testService.getContact();

      if (!contact?.id) {
        throw new NotFoundException('Contact not found');
      }

      const response = await request(app.getHttpServer())
        .put(`/api/contacts/${contact.id + 1}`)
        .set('Authorization', 'test')
        .send({
          first_name: 'test',
          last_name: 'test',
          email: 'test@example.com',
          phone: '9999',
        });

      logger.info(response.body);

      const body = response.body as WebResponse<ContactResponse>;

      expect(response.status).toBe(404);
      expect(body.errors).toBeDefined();
    });

    it('should be able to update contact', async () => {
      const contact = await testService.getContact();

      if (!contact?.id) {
        throw new NotFoundException('Contact not found');
      }

      const response = await request(app.getHttpServer())
        .put(`/api/contacts/${contact.id}`)
        .set('Authorization', 'test')
        .send({
          first_name: 'test updated',
          last_name: 'test updated',
          email: 'testupdated@example.com',
          phone: '8888',
        });

      logger.info(response.body);

      const body = response.body as WebResponse<ContactResponse>;

      expect(response.status).toBe(200);
      expect(body.data?.first_name).toBe('test updated');
      expect(body.data?.last_name).toBe('test updated');
      expect(body.data?.email).toBe('testupdated@example.com');
      expect(body.data?.phone).toBe('8888');
    });
  });

  describe('DELETE /api/contacts/:contactId', () => {
    beforeEach(async () => {
      await testService.deleteAll();

      await testService.createUser();
      await testService.createContact();
    });

    it('should be rejected if contact is not found', async () => {
      const contact = await testService.getContact();

      if (!contact?.id) {
        throw new NotFoundException('Contact not found');
      }

      const response = await request(app.getHttpServer())
        .delete(`/api/contacts/${contact.id + 1}`)
        .set('Authorization', 'test');

      logger.info(response.body);

      const body = response.body as WebResponse<ContactResponse>;

      expect(response.status).toBe(404);
      expect(body.errors).toBeDefined();
    });

    it('should be able to remove contact', async () => {
      const contact = await testService.getContact();

      if (!contact?.id) {
        throw new NotFoundException('Contact not found');
      }

      const response = await request(app.getHttpServer())
        .delete(`/api/contacts/${contact.id}`)
        .set('Authorization', 'test');

      logger.info(response.body);

      const body = response.body as WebResponse<ContactResponse>;

      expect(response.status).toBe(200);
      expect(body.data).toBe(true);
    });
  });

  describe('GET /api/contacts', () => {
    beforeEach(async () => {
      await testService.deleteContact();
      await testService.deleteUser();

      await testService.createUser();
      await testService.createContact();
    });

    it('should be able to search contacts', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/contacts`)
        .query({
          name: 'st',
        })
        .set('Authorization', 'test');

      logger.info(response.body);

      const body = response.body as WebResponse<ContactResponse[]>;

      expect(response.status).toBe(200);
      expect(body.data?.length).toBe(1);
    });

    it('should be able to search contacts by name not found', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/contacts`)
        .query({
          name: 'wrong',
        })
        .set('Authorization', 'test');

      logger.info(response.body);

      const body = response.body as WebResponse<ContactResponse[]>;

      expect(response.status).toBe(200);
      expect(body.data?.length).toBe(0);
    });

    it('should be able to search contacts by email', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/contacts`)
        .query({
          email: 'st',
        })
        .set('Authorization', 'test');

      logger.info(response.body);

      const body = response.body as WebResponse<ContactResponse[]>;

      expect(response.status).toBe(200);
      expect(body.data?.length).toBe(1);
    });

    it('should be able to search contacts by email not found', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/contacts`)
        .query({
          email: 'wrong',
        })
        .set('Authorization', 'test');

      logger.info(response.body);

      const body = response.body as WebResponse<ContactResponse[]>;

      expect(response.status).toBe(200);
      expect(body.data?.length).toBe(0);
    });

    it('should be able to search contacts by phone', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/contacts`)
        .query({
          phone: '99',
        })
        .set('Authorization', 'test');

      logger.info(response.body);

      const body = response.body as WebResponse<ContactResponse[]>;

      expect(response.status).toBe(200);
      expect(body.data?.length).toBe(1);
    });

    it('should be able to search contacts by phone not found', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/contacts`)
        .query({
          name: '88',
        })
        .set('Authorization', 'test');

      logger.info(response.body);

      const body = response.body as WebResponse<ContactResponse[]>;

      expect(response.status).toBe(200);
      expect(body.data?.length).toBe(0);
    });

    it('should be able to search contacts with page', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/contacts`)
        .query({
          size: 1,
          page: 2,
        })
        .set('Authorization', 'test');

      logger.info(response.body);

      const body = response.body as WebResponse<ContactResponse[]>;

      expect(response.status).toBe(200);
      expect(body.data?.length).toBe(0);
      expect(body.paging?.current_page).toBe(2);
      expect(body.paging?.total_page).toBe(1);
      expect(body.paging?.size).toBe(1);
    });
  });
});
