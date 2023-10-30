import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateUserDto } from './create.user.dto';

export class UpdateUserDto extends OmitType(CreateUserDto, ['email'] as const) {
  @IsOptional()
  @ApiProperty({
    description: 'name',
    example: '철수',
  })
  name: string;

  @IsOptional()
  @ApiProperty({
    description: 'password',
    example: '19990',
  })
  password: string;
}
