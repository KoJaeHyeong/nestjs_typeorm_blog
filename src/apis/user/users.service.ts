import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { UserRepository } from './entities/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async signUp(userInfo: CreateUserDto) {
    const { email, ...rest } = userInfo;

    const existsUser = await this.userRepository.userExistByEmail(email);

    if (existsUser)
      throw new BadRequestException('이미 존재하는 이메일입니다.');

    const { password, ...res } = await this.userRepository.userSave(userInfo);

    return res;
  }
}
