import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { IAuthUser } from 'src/common/auth/get-users.decorators';
import { CreateCommentDto } from './dto/create.comments.dto';
import { UpdateCommentDto } from './dto/update.comments.dto';
import { CommentsRepository } from './entities/comments.repository';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}
  async createComments(
    commentUser: IAuthUser,
    commentsInfo: CreateCommentDto,
    blogId: string,
    parentCommentId?: string,
  ) {
    try {
      const result = await this.commentsRepository.saveComments(
        blogId,
        commentUser.id,
        commentsInfo,
        parentCommentId,
      );

      const { blog, user, parentComments, ...data } = result;

      return data;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateComments(commentId: string, updateComments: UpdateCommentDto) {
    try {
      const findComment =
        await this.commentsRepository.findOneBlogUserComments(commentId);

      if (!findComment)
        throw new BadRequestException('댓글이 존재하지 않습니다.');

      const newComments = {
        ...findComment,
        ...updateComments,
      };

      const result = await this.commentsRepository.updateComments(newComments);

      const { blog, user, ...comments } = result;

      return comments;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteComments(authUser: IAuthUser, commentsId: string) {
    const comments =
      await this.commentsRepository.findOneUserComments(commentsId);

    const { user, ...commentsInfo } = comments;

    if (!comments) throw new BadRequestException('댓글이 존재하지 않습니다.');

    if (user.id !== authUser.id) throw new UnauthorizedException();

    return await this.commentsRepository.deleteComments(commentsId);
  }
}
