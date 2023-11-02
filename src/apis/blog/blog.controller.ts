import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthUser, IAuthUser } from 'src/common/auth/get-users.decorators';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { ResponseInterceptor } from 'src/common/filter/response.interceptor';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';

import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create.blog.dto';
import { UpdateBlogDto } from './dto/update.blog.dto';

@UseInterceptors(ResponseInterceptor)
@UseFilters(HttpExceptionFilter)
@ApiTags('Blog')
@Controller('users/blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @ApiOperation({ summary: '블로그 작성' })
  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Post()
  async createBlog(
    @AuthUser() authUser: IAuthUser,
    @Body() body: CreateBlogDto,
  ) {
    return await this.blogService.createBlog(authUser.id, body);
  }

  @ApiOperation({ summary: '블로그 수정' })
  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateBlog(
    @AuthUser() authUser: IAuthUser,
    @Param('id') blogId: string,
    @Body() body: UpdateBlogDto,
  ) {
    return await this.blogService.updateBlog(authUser.id, blogId, body);
  }

  @ApiOperation({ summary: '유저의 블로그 조회' })
  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async fetchBlog(@Param('id') blogId: string, @Req() req: Request) {
    return await this.blogService.fetchBlog(blogId);
  }

  @ApiOperation({ summary: '유저의 블로그 목록 조회' }) //todo 페이지네이션으로 구현
  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Get()
  async fetchAllBlog(
    @AuthUser() authUser: IAuthUser,
    @Query('page') page: number = 1,
    @Query('take') take: number,
  ) {
    return await this.blogService.fetchAllBlog(authUser.id, page, take);
  }

  @ApiOperation({ summary: '블로그 삭제' })
  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteBlog(@Param('id') blogId: string) {
    return await this.blogService.deleteBlog(blogId);
  }
}
