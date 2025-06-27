import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { AppModule } from '../src/app.module';
import { TestService } from './test.service';
import { TestModule } from './test.module';
import { UserResponse } from '../src/model/user.model';
import { WebResponse } from '../src/model/Web.model';

describe('UserController', () => {
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

  describe('POST /api/users', () => {
    beforeEach(async () => {
      await testService.deleteAll();
    });

    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users')
        .send({
          username: '',
          password: '',
          name: '',
        });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.error).toBeDefined();
    });

    it('should be able to register', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users')
        .send({
          username: 'test',
          password: 'test',
          name: 'test',
        });

      logger.info(response.body);

      const body = response.body as WebResponse<UserResponse>;

      expect(response.status).toBe(200);
      expect(body.data?.username).toBe('test');
      expect(body.data?.name).toBe('test');
    });

    it('should be rejected if username already exists', async () => {
      await testService.createUser();

      const response = await request(app.getHttpServer())
        .post('/api/users')
        .send({
          username: 'test',
          password: 'test',
          name: 'test',
        });

      logger.info(response.body);

      const body = response.body as WebResponse<UserResponse>;

      expect(response.status).toBe(409);
      expect(body.errors).toBeDefined();
    });
  });

  describe('POST /api/users/login', () => {
    beforeEach(async () => {
      await testService.deleteAll();
      await testService.createUser();
    });

    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users/login')
        .send({
          username: '',
          password: '',
        });

      logger.info(response.body);

      const body = response.body as WebResponse<UserResponse>;

      expect(response.status).toBe(400);
      expect(body.errors).toBeDefined();
    });

    it('should be able to login', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users/login')
        .send({
          username: 'test',
          password: 'test',
        });

      logger.info(response.body);

      const body = response.body as WebResponse<UserResponse>;

      expect(response.status).toBe(200);
      expect(body.data?.username).toBe('test');
      expect(body.data?.name).toBe('test');
      expect(body.data?.token).toBeDefined();
    });
  });

  describe('GET /api/users/current', () => {
    beforeEach(async () => {
      await testService.deleteAll();
      await testService.createUser();
    });

    it('should be rejected if token is invalid', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/users/current')
        .set('Authorization', 'wrong');

      logger.info(response.body);

      const body = response.body as WebResponse<UserResponse>;

      expect(response.status).toBe(401);
      expect(body.errors).toBeDefined();
    });

    it('should be able to get user', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/users/current')
        .set('Authorization', 'test');

      logger.info(response.body);

      const body = response.body as WebResponse<UserResponse>;

      expect(response.status).toBe(200);
      expect(body.data?.username).toBe('test');
      expect(body.data?.name).toBe('test');
    });
  });

  describe('PATCH /api/users', () => {
    beforeEach(async () => {
      await testService.deleteAll();
      await testService.createUser();
    });

    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer())
        .patch('/api/users/current')
        .set('Authorization', 'test')
        .send({
          name: '',
          password: '',
        });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.error).toBeDefined();
    });

    it('should be able update name', async () => {
      const response = await request(app.getHttpServer())
        .patch('/api/users/current')
        .set('Authorization', 'test')
        .send({
          name: 'test',
        });

      logger.info(response.body);

      const body = response.body as WebResponse<UserResponse>;

      expect(response.status).toBe(200);
      expect(body.data?.username).toBe('test');
      expect(body.data?.name).toBe('test');
    });

    it('should be able update password', async () => {
      let response = await request(app.getHttpServer())
        .patch('/api/users/current')
        .set('Authorization', 'test')
        .send({
          password: 'updated',
        });

      logger.info(response.body);

      let body = response.body as WebResponse<UserResponse>;

      expect(response.status).toBe(200);
      expect(body.data?.username).toBe('test');
      expect(body.data?.name).toBe('test');

      response = await request(app.getHttpServer())
        .post('/api/users/login')
        .send({
          username: 'test',
          password: 'updated',
        });

      logger.info(response.body);

      body = response.body as WebResponse<UserResponse>;

      expect(response.status).toBe(200);
      expect(body.data?.token).toBeDefined();
    });
  });

  describe('GET /api/users/current', () => {
    beforeEach(async () => {
      await testService.deleteAll();
      await testService.createUser();
    });

    it('should be rejected if token is invalid', async () => {
      const response = await request(app.getHttpServer())
        .delete('/api/users/current')
        .set('Authorization', 'wrong');

      logger.info(response.body);

      const body = response.body as WebResponse<UserResponse>;

      expect(response.status).toBe(401);
      expect(body.errors).toBeDefined();
    });

    it('should be able to logout', async () => {
      const response = await request(app.getHttpServer())
        .delete('/api/users/current')
        .set('Authorization', 'test');

      logger.info(response.body);

      const body = response.body as WebResponse<boolean>;

      expect(response.status).toBe(200);
      expect(body.data).toBe(true);

      const user = await testService.getUser();
      expect(user?.token).toBeNull();
    });
  });
});
