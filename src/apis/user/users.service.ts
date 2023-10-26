import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from '../auth/dto/login.request.dto';
import { CreateUserDto } from './dto/create.user.dto';
import { UserRepository } from './entities/user.repository';

@Injectable()
export class UsersService {
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

    return result;
  }

  async login(loginInfo: LoginDto) {
    const { email, password } = loginInfo;

    const user = await this.userRepository.userFindByEmail(email);

    console.log(user);

    if (!user) throw new UnauthorizedException('존재하지 않는 이메일입니다.');

    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (!isMatchPassword)
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');

    return this.authService.getAccessToken(user);
  }
}
