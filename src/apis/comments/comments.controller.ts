import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthUser, IAuthUser } from 'src/common/auth/get-users.decorators';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { ResponseInterceptor } from 'src/common/filter/response.interceptor';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create.comments.dto';
import { UpdateCommentDto } from './dto/update.comments.dto';

@UseFilters(HttpExceptionFilter)
@UseInterceptors(ResponseInterceptor)
@ApiTags('Comment')
@Controller('blog/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({
    summary: '댓글 작성',
  })
  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Post()
  async createComments(
    @Body() body: CreateCommentDto,
    @Query('blog_id') blogId: string,
    @AuthUser() authUser: IAuthUser,
    @Query('parentComment_id') parentCommentId?: string,
  ) {
    console.log(parentCommentId);

    return this.commentsService.createComments(
      authUser,
      body,
      blogId,
      parentCommentId,
    );
  }

  @ApiOperation({
    summary: '댓글 수정',
  })
  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Put(':comment_id')
  async updateComments(
    @Body() body: UpdateCommentDto,
    @Param('comment_id') commentId: string,
  ) {
    return this.commentsService.updateComments(commentId, body);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
