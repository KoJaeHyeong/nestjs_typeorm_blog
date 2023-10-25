import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogTag } from '../blog_tag/entities/blog_tag.entity';
import { User } from '../user/entities/user.entity';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { Blog } from './entities/blog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Blog, User, BlogTag])],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
