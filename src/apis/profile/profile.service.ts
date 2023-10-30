import { Injectable } from '@nestjs/common';
import { IAuthUser } from 'src/common/auth/get-users.decorators';
import { CreateProfileDto } from './dto/create.profile.dto';
import { ProfileRepository } from './entities/profile.repository';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async saveProfile(authId: string, profileInfo: CreateProfileDto) {
    console.log('@@@@@@@@');

    return await this.profileRepository.saveProfile(authId, profileInfo);
  }

  async updateProfile(id: string, profileInfo: CreateProfileDto) {
    const profile = await this.profileRepository.findProfileById(id);

    const newProfile = {
      ...profile,
      ...profileInfo,
    };

    return await this.profileRepository.updateProfile(newProfile);
  }

  async fetchProfile(authUser: IAuthUser) {
    return await this.profileRepository.fetchProfile(authUser.id);
  }

  async deleteProfile(profileId: string) {
    return await this.profileRepository.deleteProfile(profileId);
  }
}
