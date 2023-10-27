import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create.user.dto';
import { User } from './user.entity';

export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async userSave(userInfo: CreateUserDto) {
    return await this.userRepository.save(userInfo);
  }

  async userExistByEmail(email: string) {
    const result = await this.userRepository.exist({
      where: {
        email,
      },
    });

    return result;
  }

  async userFindByEmail(email: string) {
    const result = await this.userRepository.findOne({
      where: { email },
    });

    return result;
  }

  async userFindById(id: string, rel?: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: [rel],
    });

    if (!user)
      throw new BadRequestException('해당하는 사용자를 찾을 수 없습니다.');

    delete user.password;
    return user;
  }
}
