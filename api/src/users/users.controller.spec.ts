import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const sucessMessage = { message: `user01 foi cadastrado com sucesso` };

const mockUser = {
  username: 'user01',
  password: '12345678',
};

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue({
              message: `user01 foi cadastrado com sucesso`,
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return sucess message', async () => {
    const createSpy = jest
      .spyOn(service, 'create')
      .mockResolvedValueOnce(sucessMessage);

    const returnMessage = await controller.create(mockUser);
    expect(createSpy).toHaveBeenCalledWith(mockUser);
    expect(returnMessage).toEqual(sucessMessage);
  });
});
