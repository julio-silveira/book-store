import { JwtModule, JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';

import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { User } from '../users/schemas/user.schema';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';

const mockUser = {
  username: 'user01',
  password: '$2b$10$/ntrhGMhi87W8j2qO4MdA.vdbC/Qr1CqDoSGKfafPcHmsNMRlgH5y',
};

const options = {
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    UsersService,
    LocalStrategy,
    JwtService,
    {
      provide: getModelToken('User'),
      useValue: {
        new: jest.fn().mockResolvedValue(mockUser),
        constructor: jest.fn().mockResolvedValue(mockUser),
        findOne: jest.fn(),
        exec: jest.fn(),
      },
    },
  ],
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule(
      options,
    ).compile();

    service = moduleRef.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('validateUser', () => {
  let service: AuthService;
  let model: Model<User>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule(
      options,
    ).compile();

    service = moduleRef.get<AuthService>(AuthService);
    model = moduleRef.get<Model<User>>(getModelToken('User'));
  });

  it('should return username and passwordhash when password match', async () => {
    jest.spyOn(model, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockUser),
    } as any);
    const res = await service.validateUser('user01', '12345678');
    expect(res.username).toBe(mockUser.username);
  });

  it('should return null when password doesn"t match', async () => {
    jest.spyOn(model, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockUser),
    } as any);
    const res = await service.validateUser('user01', '87654321');
    expect(res).toBeNull;
  });

  it('should return null when user not exists', async () => {
    jest.spyOn(model, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(null),
    } as any);
    const res = await service.validateUser('user01', '87654321');
    expect(res).toBeNull;
  });
});

describe('Login', () => {
  let service: AuthService;
  let model: Model<User>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule(
      options,
    ).compile();

    service = moduleRef.get<AuthService>(AuthService);
    model = moduleRef.get<Model<User>>(getModelToken('User'));
  });

  it('should return acess_token when receive valid credentials', async () => {
    jest.spyOn(model, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockUser),
    } as any);
    const res = await service.login({
      username: 'user01',
      password: '12345678',
    });
    expect(res.access_token).toBeDefined;
  });
});
