import { Injectable } from '@nestjs/common';
import { ProfileCreateDto } from './dto/profile.create.dto';
import { ProfileRepository } from './entities/profile.repository';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async profileSave(profileInfo: ProfileCreateDto, payload: any) {
    // const { intro, site } = profileInfo;

    console.log(payload);

    return await this.profileRepository.profileSave(profileInfo);
  }
}
