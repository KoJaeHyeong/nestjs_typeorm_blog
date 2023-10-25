import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogTag } from '../blog_tag/entities/blog_tag.entity';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([BlogTag])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
