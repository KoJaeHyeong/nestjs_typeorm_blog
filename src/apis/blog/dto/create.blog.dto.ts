import { PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Blog } from '../entities/blog.entity';

export class CreateBlogDto extends PickType(Blog, [
  'title',
  'contents',
  'description',
] as const) {
  @ApiProperty({
    required: true,
    description: '블로그 제목',
    example: 'js와 java의 차이',
  })
  title: string;

  @ApiProperty({
    required: false,
    description: '블로그 설명',
    example: 'js와 java의 차이점을 설명',
  })
  description?: string;

  @ApiProperty({
    required: false,
    description: '블로그 내용',
    example: 'javascript와 java는 전혀 연관이 없다.',
  })
  contents?: string;
}
