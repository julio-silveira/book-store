import { IsNotEmpty, IsOptional, Length } from 'class-validator';
export class CreateBookDto {
  @IsNotEmpty()
  @Length(3, 200)
  name: string;

  @IsNotEmpty()
  @Length(3, 30)
  author: string;

  @IsNotEmpty()
  @Length(3, 30)
  genre: string;

  @IsOptional()
  pages: number;
}
