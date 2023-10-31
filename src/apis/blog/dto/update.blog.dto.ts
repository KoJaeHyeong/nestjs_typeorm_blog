import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Blog } from '../entities/blog.entity';

export class UpdateBlogDto extends PartialType(Blog) {
  @ApiProperty({
    description: '블로그 제목',
    example: 'docker란',
  })
  title?: string;

  @ApiProperty({
    required: false,
    description: '블로그 설명',
    example: 'docker 공부',
  })
  description?: string;

  @ApiProperty({
    required: false,
    description: '블로그 내용',
    example: 'docker는 컨테이너를 가지고 있다.',
  })
  contents?: string;

  @ApiProperty({
    required: false,
    description: '좋아요 ',
    example: true,
  })
  like_num?: number;
}
