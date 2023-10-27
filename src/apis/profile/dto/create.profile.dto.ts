import { PickType } from '@nestjs/mapped-types';
import { Profile } from '../entities/profile.entity';

export class CreateProfileDto extends PickType(Profile, [
  'intro',
  'site',
] as const) {}
