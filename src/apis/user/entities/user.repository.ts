import { BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/apis/profile/entities/profile.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create.user.dto';
import { User } from './user.entity';

export class UserRepository {
  private readonly logger = new Logger(UserRepository.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async userSave(userInfo: CreateUserDto) {
    return await this.userRepository.save({ ...userInfo });
  }

  async userExistByEmail(email: string) {
    const result = await this.userRepository.exist({
      where: {
        email,
      },
    });

    return result;
  }

  async userFindByEmail(email: string, rel?: string) {
    const result = await this.userRepository.findOne({
      where: { email },
    });

    return result;
  }

  async userFindById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user)
      throw new BadRequestException('해당하는 사용자를 찾을 수 없습니다.');

    delete user.password;
    return user;
  }

  async userUpdateByEmail(body: any) {
    try {
      const { email, ...updateInfo } = body;

      return await this.userRepository.save(body);
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  async userUpdate(body: any) {
    try {
      return await this.userRepository.save(body);
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  async deleteUser(user: any) {
    try {
      await this.userRepository.remove(user);

      return true;
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
