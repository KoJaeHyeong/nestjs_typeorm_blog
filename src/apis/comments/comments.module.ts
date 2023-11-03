import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from '../blog/blog.module';
import { Blog } from '../blog/entities/blog.entity';
import { User } from '../user/entities/user.entity';
import { UsersModule } from '../user/users.module';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comments.entity';
import { CommentsRepository } from './entities/comments.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, Blog, User]),
    BlogModule,
    UsersModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository],
})
export class CommentsModule {}
