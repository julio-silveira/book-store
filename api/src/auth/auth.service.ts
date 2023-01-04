import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/users/dto/user.dto';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne(username);
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (user && isPasswordMatch) {
      const { ...result } = user;
      Logger.log(result);
      return result;
    } else return null;
  }

  async login({ username, password }: UserDto): Promise<User> {
    return { username, password };
  }
}
