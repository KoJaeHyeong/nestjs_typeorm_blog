import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthUser, IAuthUser } from 'src/common/auth/get-users.decorators';
import { ResponseInterceptor } from 'src/common/filter/response.interceptor';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';

import { FileInterceptor } from '@nestjs/platform-express';
import { AwsService } from 'src/aws.service';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create.blog.dto';
import { CreateFileDto } from './dto/file.create.dto';
import { plusLikeDto } from './dto/plus.like.dto';
import { UpdateBlogDto } from './dto/update.blog.dto';

@UseInterceptors(ResponseInterceptor)
@UseFilters(HttpExceptionFilter)
@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    private readonly awsService: AwsService,
  ) {}

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
  @Get(':id')
  async fetchBlog(@Param('id') blogId: string) {
    return await this.blogService.fetchBlog(blogId);
  }

  @ApiOperation({ summary: '유저의 블로그 목록 조회' }) //todo 페이지네이션으로 구현
  @ApiBearerAuth('access_token')
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

  @ApiOperation({ summary: '좋아요 ' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access_token')
  @Post('like')
  async likeChange(
    @Query('blog_id') blogId: string,
    @Body() body: plusLikeDto,
  ) {
    return await this.blogService.likeChange(blogId, body);
  }

  @ApiOperation({ summary: '이미지 저장' })
  @ApiBearerAuth('access_token')
  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', { limits: { fileSize: 4000000 } }))
  async upload(
    @UploadedFile() file: CreateFileDto,
    @AuthUser() authUser: IAuthUser,
  ) {
    if (process.env.DEV_MODE === 'dev')
      return await this.blogService.upLoadLocalImg(
        'upload',
        authUser.email,
        file,
      );

    return await this.awsService.upLoadFilesToS3(
      'upload',
      authUser.email,
      file,
    );
  }

  @ApiOperation({ summary: '이미지 삭제' })
  @ApiBearerAuth('access_token')
  @Post('deleteimg')
  @UseGuards(JwtAuthGuard)
  async deleteImg(@Body() body: object, @AuthUser() authUser: IAuthUser) {
    if (process.env.DEV_MODE === 'dev')
      return await this.blogService.deleteLocaImg('upload', body);

    return this.awsService.deleteS3File('upload', body);
  }
}
