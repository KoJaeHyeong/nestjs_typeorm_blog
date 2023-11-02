import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateBlogDto } from './create.blog.dto';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
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
    required: true,
    description: 'tag 이름',
    example: ['Javascript', 'docker'],
  })
  tag?: string[];
}
