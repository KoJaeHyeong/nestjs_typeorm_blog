import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthUser, IAuthUser } from 'src/common/auth/get-users.decorators';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { ResponseInterceptor } from 'src/common/filter/response.interceptor';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { CreateProfileDto } from './dto/create.profile.dto';
import { UpdateProfileDto } from './dto/update.profile.dto';
import { ProfileService } from './profile.service';

@UseInterceptors(ResponseInterceptor)
@UseFilters(HttpExceptionFilter)
@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOperation({
    summary: '프로필 작성',
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createProfile(
    @Body() body: CreateProfileDto,
    @AuthUser() authUser: IAuthUser,
  ) {
    return await this.profileService.saveProfile(body, authUser);
  }

  @ApiOperation({
    summary: '프로필 조회',
  })
  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Get()
  async fetchProfile(@AuthUser() authUser: IAuthUser) {
    return await this.profileService.fetchProfile(authUser);
  }

  @ApiOperation({
    summary: '프로필 수정',
  })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateProfile(@Param('id') id: string, @Body() body: UpdateProfileDto) {
    return await this.profileService.updateProfile(id, body);
  }
}
