import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogTag } from '../blog_tag/entities/blog_tag.entity';
import { TagModule } from '../tag/tag.module';
import { User } from '../user/entities/user.entity';
import { UsersModule } from '../user/users.module';

import { AwsService } from 'src/aws.service';
import { CommentsModule } from '../comments/comments.module';
import { Comment } from '../comments/entities/comments.entity';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { Blog } from './entities/blog.entity';
import { BlogRepository } from './entities/blog.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Blog, User, BlogTag, Comment]),
    UsersModule,
    TagModule,
    forwardRef(() => CommentsModule),
  ],
  controllers: [BlogController],
  providers: [BlogService, BlogRepository, AwsService],
})
export class BlogModule {}
