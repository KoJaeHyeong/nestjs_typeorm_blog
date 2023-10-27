import {
  Body,
  Controller,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { ResponseInterceptor } from 'src/common/filter/response.interceptor';
import { LoginDto } from '../auth/dto/login.request.dto';
import { CreateUserDto } from './dto/create.user.dto';
import { UsersService } from './users.service';

@UseInterceptors(ResponseInterceptor)
@UseFilters(HttpExceptionFilter)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: '회원가입',
  })
  @Post('signup')
  // @ApiBody({
  //   schema: {
  //     example: { email: 'sdsds', name: '재형', password: '1234' },
  //   },
  // })
  async signUp(@Body() body: CreateUserDto) {
    return await this.usersService.signUp(body);
  }

  @ApiOperation({
    summary: '로그인',
  })
  @Post('login')
  async login(@Body() body: LoginDto) {
    return await this.usersService.login(body);
  }
}
