import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
  ) {}

  async create(userDto: UserDto): Promise<User> {
    const createdUser = await this.UserModel.create(userDto);
    return createdUser;
  }

  async login(userDto: UserDto): Promise<User> {
    const user = await this.UserModel.findOne({ name: userDto.name }).exec();

    return user;
  }
}
