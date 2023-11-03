import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateCommentDto } from './create.comments.dto';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @ApiProperty({
    required: true,
    description: '댓글 / 대댓글 수정',
    example: '이거는 댓글 수정입니다.',
  })
  comments?: string;
}
