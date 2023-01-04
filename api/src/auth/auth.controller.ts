import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { UserDto } from 'src/users/dto/user.dto';
import { User } from 'src/users/schemas/user.schema';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth-guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @HttpCode(200)
  async login(@Body() userDto: UserDto): Promise<User> {
    return await this.authService.login(userDto);
  }
}
