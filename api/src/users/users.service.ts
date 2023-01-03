import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
  ) {}

  async create(userDto: UserDto): Promise<User> {
    const user = await this.UserModel.findOne({ name: userDto.name }).exec();
    if (user !== null)
      throw new BadRequestException('Já existe um usuário com este nome');

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(userDto.password, salt);

    const userData = {
      name: userDto.name,
      password: hash,
    };
    const createdUser = await this.UserModel.create(userData);
    return createdUser;
  }

  async login(userDto: UserDto): Promise<User> {
    const user = await this.UserModel.findOne({ name: userDto.name }).exec();
    if (!user) throw new BadRequestException('Usuário não encontrado');
    const isMatch = await bcrypt.compare(userDto.password, user.password);
    if (!isMatch)
      throw new HttpException('Senha incorreta', HttpStatus.UNAUTHORIZED);
    return user;
  }
}
