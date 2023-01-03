import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() UserDto: UserDto): Promise<User> {
    return await this.usersService.create(UserDto);
  }

  @Post('/login')
  async login(@Body() UserDto: UserDto): Promise<User> {
    return await this.usersService.login(UserDto);
  }
}
