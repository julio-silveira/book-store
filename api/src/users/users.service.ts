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
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findOne(username: string): Promise<User | null> {
    return await this.userModel.findOne({ username }).exec();
  }

  async create({ username, password }: UserDto): Promise<User> {
    const user = await this.findOne(username);
    if (user !== null)
      throw new BadRequestException('Já existe um usuário com este nome');

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const userDataToSave = {
      username,
      password: hash,
    };
    const createdUser = await this.userModel.create(userDataToSave);
    return createdUser;
  }
}
