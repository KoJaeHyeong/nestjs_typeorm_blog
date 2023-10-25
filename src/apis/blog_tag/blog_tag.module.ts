import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from '../blog/entities/blog.entity';
import { Tag } from '../tag/entities/tag.entity';
import { BlogTagController } from './blog_tag.controller';
import { BlogTagService } from './blog_tag.service';
import { BlogTag } from './entities/blog_tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlogTag, Blog, Tag])],
  controllers: [BlogTagController],
  providers: [BlogTagService],
})
export class BlogTagModule {}
