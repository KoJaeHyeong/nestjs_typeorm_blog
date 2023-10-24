import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(body: CreateUserDto) {
    const { email, name, password } = body;

    const exists = await this.userRepository.exist({ where: { email: email } });

    if (exists) {
      throw new UnauthorizedException('이미 존재하는 이메일입니다.');
    }
    try {
      const result = await this.userRepository.save({
        email,
        name,
        password,
      });

      return result;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
