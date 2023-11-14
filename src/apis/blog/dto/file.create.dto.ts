import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateFileDto {
  @ApiProperty({
    description: '이미지 저장',
  })
  @IsOptional()
  image: Express.Multer.File;
}
