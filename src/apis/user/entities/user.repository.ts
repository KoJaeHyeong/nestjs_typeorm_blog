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
    const result = await this.userRepository.save(userInfo);
    console.log('saveResult', result);

    return result;
  }

  async userExistByEmail(email: string) {
    const result = await this.userRepository.exist({
      where: {
        email,
      },
    });

    return result;
  }
}
