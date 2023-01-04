import { BadRequestException, Injectable } from '@nestjs/common';
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

  private async checkUsernameDisponiblity(username: string) {
    const user = await this.findOne(username);
    if (user !== null) return false;
    else return true;
  }

  private async generatePasswordHash(password: string) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async findOne(username: string): Promise<User | null> {
    return await this.userModel.findOne({ username }).exec();
  }

  async create({ username, password }: UserDto) {
    const isUsernameDisponible = await this.checkUsernameDisponiblity(username);
    if (!isUsernameDisponible)
      throw new BadRequestException(
        'Já cadastrado existe um usuário com este nome',
      );

    const passwordHash = await this.generatePasswordHash(password);

    const userDataToSave = {
      username,
      password: passwordHash,
    };
    const createdUser = await this.userModel.create(userDataToSave);
    return { message: `${createdUser.username} foi cadastrado com sucesso` };
  }
}
