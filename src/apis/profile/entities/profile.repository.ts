import { BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/apis/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from '../dto/create.profile.dto';
import { Profile } from './profile.entity';

export class ProfileRepository {
  private logger = new Logger(ProfileRepository.name);

  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async saveProfile(authId: string, profileInfo: CreateProfileDto) {
    try {
      console.log('profileInfo', profileInfo);

      const fetchUser = await this.userRepository.findOne({
        where: { id: authId },
      });
      const result = await this.profileRepository.save({
        ...profileInfo,
        user: fetchUser,
      });

      const { user, ...data } = result; // return_form 변경

      return data;
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  // save를 통해 결과값을 모두 반환 해줘야 그 값을 표출하기 편함.
  async updateProfile(profileInfo: object) {
    try {
      const result = await this.profileRepository.save(profileInfo);

      return result;
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  async findProfileById(id: string) {
    try {
      const profile = await this.profileRepository.findOne({ where: { id } });
      if (!profile)
        throw new BadRequestException('프로필이 존재하지 않습니다.');

      return profile;
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  async fetchProfile(userId: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['profile'],
      });

      const profileId = user.profile.id;

      const result = await this.profileRepository.findOne({
        where: { id: profileId },
      });

      return result;
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  async deleteProfile(profileId: string) {
    try {
      await this.profileRepository.delete(profileId);

      return true;
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
