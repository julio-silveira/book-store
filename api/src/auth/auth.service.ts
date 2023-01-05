import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne(username);
    if (!user) return null;
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
      const { ...result } = user;
      return result;
    } else return null;
  }

  async login({ username }: UserDto) {
    const payload = { username };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: jwtConstants.secret,
      }),
    };
  }
}
