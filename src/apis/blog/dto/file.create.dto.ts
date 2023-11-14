import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateFileDto {
  @ApiProperty({
    description: '썸네일 이미지',
    example: '[file...]',
  })
  @IsOptional()
  thumbnail?: Express.Multer.File;

  @ApiProperty({
    description: '게시글 이미지들',
    example: '[file...]',
  })
  @IsOptional()
  imgs?: Express.Multer.File[];
}
