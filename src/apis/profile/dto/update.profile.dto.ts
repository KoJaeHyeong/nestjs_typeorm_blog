import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateProfileDto } from './create.profile.dto';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
  @ApiProperty({
    nullable: true,
    required: false,
    type: 'string',
    example: '저의 프로필을 수정합니다.',
  })
  intro: string;

  @ApiProperty({
    nullable: true,
    required: false,
    type: 'string',
    example: 'www.google.com',
  })
  site: string;
}
