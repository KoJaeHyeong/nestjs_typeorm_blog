import { Injectable } from '@nestjs/common';
import { IAuthUser } from 'src/common/auth/get-users.decorators';
import { CreateProfileDto } from './dto/create.profile.dto';
import { UpdateProfileDto } from './dto/update.profile.dto';
import { ProfileRepository } from './entities/profile.repository';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async saveProfile(profileInfo: CreateProfileDto, authUser: IAuthUser) {
    return await this.profileRepository.saveProfile(profileInfo, authUser);
  }

  async updateProfile(id: string, profileInfo: UpdateProfileDto) {
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
}
