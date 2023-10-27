import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/apis/user/entities/user.entity';
import { Repository } from 'typeorm';
import { ProfileCreateDto } from '../dto/profile.create.dto';
import { Profile } from './profile.entity';

export class ProfileRepository {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async profileSave(profileInfo: ProfileCreateDto) {
    // return await this.profileRepository.save(profileInfo);
    const result = await this.profileRepository.save(profileInfo);

    console.log(result);

    // await this.userRepository.update(
    //   { id: '06786b31-5b81-4d95-adf4-dcec5bc7c86d' },
    //   { profile: result },
    // );

    const aa = await this.userRepository.findOne({
      where: { id: '06786b31-5b81-4d95-adf4-dcec5bc7c86d' },
      relations: ['profile'],
    });

    console.log(aa);

    return aa;
  }
}
