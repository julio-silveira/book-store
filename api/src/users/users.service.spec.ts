import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { BadRequestException } from '@nestjs/common';

const mockUser = {
  username: 'user01',
  password: '12345678',
};

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser),
            constructor: jest.fn().mockResolvedValue(mockUser),
            findOne: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should insert a new user', async () => {
    jest.spyOn(model, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(null),
    } as null);
    jest.spyOn(model, 'create').mockImplementation(() =>
      Promise.resolve({
        username: 'user01',
        password: '12345678',
      }),
    );

    const newUser = await service.create({
      username: 'user01',
      password: '123456',
    });

    expect(newUser).toEqual({ message: `user01 foi cadastrado com sucesso` });
  });

  it('should throw a BadRequestExpection when try insert a unavailable username', async () => {
    jest.spyOn(model, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockUser),
    } as any);

    await expect(
      service.create({ username: 'user01', password: '123456' }),
    ).rejects.toThrowError(BadRequestException);
  });

  it('should convert the password in valid bcrypt hash', async () => {
    const password = '12345678';
    const hashedPassword = await service.generatePasswordHash(password);
    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);
    expect(isPasswordMatch).toBeTruthy;
  });
});
