import { PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Comment } from '../entities/comments.entity';

export class CreateCommentDto extends PickType(Comment, ['comments'] as const) {
  @ApiProperty({
    required: true,
    description: '댓글 / 대댓글',
    example: '이런 경우에는 어떻게 하나요?',
  })
  comments: string;
}
