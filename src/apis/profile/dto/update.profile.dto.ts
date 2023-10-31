import { PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Profile } from '../entities/profile.entity';

export class UpdateProfileDto extends PickType(Profile, [
  'intro',
  'site',
] as const) {
  @ApiProperty({
    required: false,
    description: '프로필 소개',
    example: '저의 프로필을 수정합니다.',
  })
  intro?: string;

  @ApiProperty({
    required: false,
    description: '블로그 사이트',
    example: 'www.google.com',
  })
  site?: string;
}
