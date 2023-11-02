import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTagDto {
  @IsString({ each: true }) // 배열안 string 유효성 검사
  @ApiProperty({
    required: true,
    description: 'tag_name',
    example: ['docker'],
  })
  tag_name: string[];
}
