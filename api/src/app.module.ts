import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [BooksModule, UsersModule, AuthModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
