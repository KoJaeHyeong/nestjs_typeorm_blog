import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthUser, IAuthUser } from 'src/common/auth/get-users.decorators';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { ResponseInterceptor } from 'src/common/filter/response.interceptor';
import { LoginDto } from '../auth/dto/login.request.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { UsersService } from './users.service';

@UseInterceptors(ResponseInterceptor)
@UseFilters(HttpExceptionFilter)
@ApiTags('Users')
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

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: '유저 정보 조회',
  })
  @Get()
  async fetchUser(@AuthUser() authUser: IAuthUser) {
    return await this.usersService.fetchUser(authUser.email);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: '유저 정보 수정',
  })
  @Patch()
  async updateUser(
    @AuthUser() authUser: IAuthUser,
    @Body() body: UpdateUserDto,
  ) {
    return await this.usersService.updateUser(authUser.email, body);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: '회원 탈퇴',
  })
  @Delete()
  async deleteUser(@AuthUser() authUser: IAuthUser, @Body() body: any) {
    return await this.usersService.deleteUser(authUser.email, body);
  }
}
