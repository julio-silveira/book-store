import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(3, 30)
  name: string;

  @IsEmail()
  email: string;
  password: string;
}
