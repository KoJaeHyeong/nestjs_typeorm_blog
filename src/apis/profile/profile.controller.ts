import {
  Body,
  Controller,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthUser, IAuthUser } from 'src/common/auth/get-users.decorators';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { ResponseInterceptor } from 'src/common/filter/response.interceptor';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { ProfileCreateDto } from './dto/profile.create.dto';
import { ProfileService } from './profile.service';

@UseInterceptors(ResponseInterceptor)
@UseFilters(HttpExceptionFilter)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async profileCreate(
    @Body() body: ProfileCreateDto,
    payLoad: any,
    @AuthUser() authUser: IAuthUser,
  ) {
    return await this.profileService.profileSave(body, payLoad);
  }
}
