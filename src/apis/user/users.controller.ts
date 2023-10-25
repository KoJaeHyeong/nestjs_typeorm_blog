import {
  Body,
  Controller,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { ResponseInterceptor } from 'src/common/filter/response.interceptor';
import { CreateUserDto } from './dto/create.user.dto';
import { UsersService } from './users.service';

@UseInterceptors(ResponseInterceptor)
@UseFilters(HttpExceptionFilter)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signUp(@Body() body: CreateUserDto) {
    return await this.usersService.signUp(body);
  }
}
