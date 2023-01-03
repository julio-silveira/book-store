import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URL),
    BooksModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}