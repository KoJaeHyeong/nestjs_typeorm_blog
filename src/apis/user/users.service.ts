import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from '../auth/dto/login.request.dto';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { UserRepository } from './entities/user.repository';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  async signUp(userInfo: CreateUserDto) {
    const { email, password } = userInfo;

    const existsUser = await this.userRepository.userExistByEmail(email);

    if (existsUser)
      throw new BadRequestException('이미 존재하는 이메일입니다.');

    const hashPassword = await bcrypt.hash(password, 10);

    const result = await this.userRepository.userSave({
      ...userInfo,
      password: hashPassword,
    });

    delete result.password;

    return result;
  }

  async login(loginInfo: LoginDto) {
    const { email, password } = loginInfo;

    const user = await this.userRepository.userFindByEmail(email);

    console.log('find_user', user);

    if (!user) throw new UnauthorizedException('존재하지 않는 이메일입니다.');

    const isMatchPassword = await bcrypt.compare(password, user['password']);

    if (!isMatchPassword)
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');

    return this.authService.getAccessToken(user);
  }

  async fetchUser(email: string) {
    return await this.userRepository.userFindByEmail(email);
  }

  async updateUser(email: string, updateInfo: UpdateUserDto) {
    try {
      const user = await this.userRepository.userFindByEmail(email);

      if (updateInfo.password) {
        const hashPassword = await bcrypt.hash(updateInfo.password, 10);

        updateInfo.password = hashPassword;
      }

      const newUser = {
        ...user,
        ...updateInfo,
      };

      return await this.userRepository.userUpdate(newUser);
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  async deleteUser(email: string, body: any) {
    const user = await this.userRepository.userFindByEmail(email);

    const isMatchPassword = await bcrypt.compare(body.password, user.password);

    if (!isMatchPassword)
      throw new UnauthorizedException('비밀번호를 확인 다시 확인해주세요.');

    return await this.userRepository.deleteUser(user);
  }
}
