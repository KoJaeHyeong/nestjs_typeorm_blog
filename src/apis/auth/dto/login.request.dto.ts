import { PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/apis/user/entities/user.entity';

export class LoginDto extends PickType(User, ['email', 'password'] as const) {
  @ApiProperty({
    required: true,
    type: 'string',
    example: 'kojae1586@naver.com',
  })
  email: string;

  @ApiProperty({
    required: true,
    type: 'string',
    example: '1234',
  })
  password: string;
}
