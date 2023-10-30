import { PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Profile } from '../entities/profile.entity';

export class CreateProfileDto extends PickType(Profile, [
  'intro',
  'site',
] as const) {
  @ApiProperty({
    required: false,
    type: 'string',
    example: '저의 프로필을 소개합니다.',
  })
  intro: string;

  @ApiProperty({
    required: false,
    type: 'string',
    example: 'www.naver.com',
  })
  site: string;
}
