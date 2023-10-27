import { Injectable } from '@nestjs/common';
import { IAuthUser } from 'src/common/auth/get-users.decorators';
import { CreateProfileDto } from './dto/create.profile.dto';
import { UpdateProfileDto } from './dto/update.profile.dto';
import { ProfileRepository } from './entities/profile.repository';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async saveProfile(profileInfo: CreateProfileDto, authUser: IAuthUser) {
    // const { intro, site } = profileInfo;

    return await this.profileRepository.saveProfile(profileInfo, authUser);
  }

  async updateProfile(id: string, profileInfo: UpdateProfileDto) {
    const profile = await this.profileRepository.findProfileById(id);

    console.log('profile', profile);
    console.log('input', profileInfo);
    const newProfile = {
      ...profile,
      ...profileInfo,
    };

    console.log('newProfile', newProfile);

    return await this.profileRepository.updateProfile(newProfile);
  }
}
