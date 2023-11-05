import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { CreateProfileDto } from './dto/create.profile.dto';
import { UpdateProfileDto } from './dto/update.profile.dto';
import { ProfileService } from './profile.service';

@UseInterceptors(ResponseInterceptor)
@UseFilters(HttpExceptionFilter)
@ApiTags('Profile')
@Controller('users/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOperation({
    summary: '프로필  작성',
  })
  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Post()
  async createProfile(
    @AuthUser() authUser: IAuthUser,
    @Body() body: CreateProfileDto,
  ) {
    return await this.profileService.saveProfile(authUser.id, body);
  }

  @ApiOperation({
    summary: '프로필 수정',
  })
  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateProfile(@Param('id') id: string, @Body() body: UpdateProfileDto) {
    return await this.profileService.updateProfile(id, body);
  }

  @ApiOperation({
    summary: '프로필 조회',
  })
  @Get()
  async fetchProfile(@AuthUser() authUser: IAuthUser) {
    return await this.profileService.fetchProfile(authUser);
  }

  @ApiOperation({
    summary: '프로필 삭제',
  })
  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteProfile(@Param('id') id: string) {
    return await this.profileService.deleteProfile(id);
  }
}
