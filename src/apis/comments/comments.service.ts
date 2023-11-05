import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IAuthUser } from 'src/common/auth/get-users.decorators';
import { BlogRepository } from '../blog/entities/blog.repository';
import { CreateCommentDto } from './dto/create.comments.dto';
import { UpdateCommentDto } from './dto/update.comments.dto';
import { CommentsRepository } from './entities/comments.repository';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly blogRepositroy: BlogRepository,
  ) {}
  async createComments(
    commentUser: IAuthUser,
    commentsInfo: CreateCommentDto,
    blogId: string,
    parentCommentId?: string,
  ) {
    const isExistBlog = await this.blogRepositroy.existedBlog(blogId);

    if (!isExistBlog)
      throw new BadRequestException('존재하지 않는 블로그입니다.');

    const result = await this.commentsRepository.saveComments(
      blogId,
      commentUser.id,
      commentsInfo,
      parentCommentId,
    );

    const { blog, user, parentComments, ...data } = result;

    return data;
  }

  async updateComments(commentId: string, updateComments: UpdateCommentDto) {}

  async deleteComments(authUser: IAuthUser, commentsId: string) {
    const comments =
      await this.commentsRepository.findOneUserComments(commentsId);

    const { user, ...commentsInfo } = comments;

    if (!comments) throw new BadRequestException('댓글이 존재하지 않습니다.');

    if (user.id !== authUser.id) throw new UnauthorizedException();

    return await this.commentsRepository.deleteComments(commentsId);
  }
}
