import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class plusLikeDto {
  @IsBoolean()
  @ApiProperty({
    required: true,
    description: '좋아요 플러스 / 다운',
    example: true,
  })
  postLike: boolean;
}
