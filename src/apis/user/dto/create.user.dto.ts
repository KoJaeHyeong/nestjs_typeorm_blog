import { PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class CreateUserDto extends PickType(User, [
  'email',
  'name',
  'password',
] as const) {
  @ApiProperty({
    required: true,
    description: 'email',
    example: 'kojae1586@naver.com',
  })
  email: string;
  @ApiProperty({
    required: true,
    description: 'name',
    example: '재형킹',
  })
  name: string;
  @ApiProperty({
    required: true,
    description: 'password',
    example: '1234',
  })
  password: string;
}
