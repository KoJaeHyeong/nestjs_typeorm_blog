import { InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from '../dto/create.comments.dto';
import { Comment } from './comments.entity';

export class CommentsRepository {
  private logger = new Logger(CommentsRepository.name);

  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  async saveComments(
    blogId: string,
    userId: string,
    commentInfo: CreateCommentDto,
    parentCommentId?: string,
  ) {
    try {
      if (parentCommentId) {
        return await this.commentsRepository.save({
          blog: { id: blogId },
          user: { id: userId },
          parentComments: { id: parentCommentId },
          ...commentInfo,
        });
      } else {
        return await this.commentsRepository.save({
          blog: { id: blogId },
          user: { id: userId },
          // parentComments: { id: parentCommentId },
          ...commentInfo,
        });
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateComments(body: any) {
    return await this.commentsRepository.save(body);
  }

  async findOneBlogUserComments(commentId: string) {
    return await this.commentsRepository.findOne({
      where: { id: commentId },
      relations: ['blog', 'user'],
    });
  }

  async findOneUserComments(commentId: string) {
    return await this.commentsRepository.findOne({
      where: { id: commentId },
      relations: ['user'],
    });
  }

  async deleteComments(commentsId: string) {
    try {
      await this.commentsRepository.delete({ id: commentsId });

      return true;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
