import { BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/apis/user/entities/user.entity';
import { IAuthUser } from 'src/common/auth/get-users.decorators';
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

  async saveProfile(profileInfo: CreateProfileDto, authUser: IAuthUser) {
    try {
      const result = await this.profileRepository.save(profileInfo);

      await this.userRepository.update(
        {
          id: authUser.id,
        },
        {
          profile: result,
        },
      );

      return result;
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
}
