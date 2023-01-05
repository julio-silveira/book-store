import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Connection } from 'mongoose';
import { DatabaseService } from 'src/database/database.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let dbConnection: Connection;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    dbConnection = moduleFixture
      .get<DatabaseService>(DatabaseService)
      .getDbHandle();
    await app.init();
  });

  it('Auth Login', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'user01', password: '12345678' })
      .expect(200)
      .expect('Hello World!');
  });
});
