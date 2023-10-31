import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogTag } from '../blog_tag/entities/blog_tag.entity';
import { User } from '../user/entities/user.entity';
import { UsersModule } from '../user/users.module';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { Blog } from './entities/blog.entity';
import { BlogRepository } from './entities/blog.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Blog, User, BlogTag]), UsersModule],
  controllers: [BlogController],
  providers: [BlogService, BlogRepository],
})
export class BlogModule {}
