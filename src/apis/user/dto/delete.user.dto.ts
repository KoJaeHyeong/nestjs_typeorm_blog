import { PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class deleteUserDto extends PickType(User, ['password'] as const) {
  @ApiProperty({
    example: '1234',
    description: 'password',
    required: true,
  })
  password: string;
}
