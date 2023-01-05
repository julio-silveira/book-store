import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book, BookDocument } from './schemas/book.schema';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const newBook = await this.bookModel.create(createBookDto);
    return newBook;
  }

  async findAll() {
    return await this.bookModel.find();
  }

  async findOne(id: ObjectId) {
    return await this.bookModel.findById({ _id: id });
  }

  async update(id: ObjectId, updateBookDto: UpdateBookDto) {
    const patchedBook = await this.bookModel.updateOne(
      { _id: id },
      updateBookDto,
    );
    Logger.log(patchedBook);
    return patchedBook;
  }

  async remove(id: ObjectId) {
    return await this.bookModel.remove({ _id: id });
  }
}
