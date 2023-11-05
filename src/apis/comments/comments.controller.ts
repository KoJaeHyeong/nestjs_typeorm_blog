import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
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
    summary: '댓글 / 대댓글 작성',
  })
  @ApiBearerAuth('access_token')
  @ApiQuery({ name: 'parentComment_id', type: String, required: false })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createComments(
    @Body() body: CreateCommentDto,
    @Query('blog_id') blogId: string,
    @AuthUser() authUser: IAuthUser,
    @Query('parentComment_id') parentCommentId?: string,
  ) {
    return await this.commentsService.createComments(
      authUser,
      body,
      blogId,
      parentCommentId,
    );
  }

  @ApiOperation({
    summary: '댓글 / 대댓글 수정',
  })
  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Patch(':comment_id')
  async updateComments(
    @Body() body: UpdateCommentDto,
    @Param('comment_id') commentId: string,
  ) {
    return this.commentsService.updateComments(commentId, body);
  }

  @ApiOperation({
    summary: '댓글 / 대댓글 삭제',
  })
  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Delete(':comments_id')
  deleteComments(
    @AuthUser() authUser: IAuthUser,
    @Param('comments_id') commentsId: string,
  ) {
    return this.commentsService.deleteComments(authUser, commentsId);
  }
}
