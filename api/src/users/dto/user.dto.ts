import { IsNotEmpty, Length } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @Length(3, 30)
  username: string;

  @Length(8, 30)
  @IsNotEmpty()
  password: string;
}
