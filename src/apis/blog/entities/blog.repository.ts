import { InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/apis/comments/entities/comments.entity';
import { User } from 'src/apis/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateBlogDto } from '../dto/create.blog.dto';
import { UpdateBlogDto } from '../dto/update.blog.dto';
import { Blog } from './blog.entity';

export class BlogRepository {
  private readonly logger = new Logger(BlogRepository.name);

  constructor(
    @InjectRepository(Blog)
    private readonly blogRepositroy: Repository<Blog>,
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}
  async saveBlog(originUser: User, blogInfo: CreateBlogDto) {
    const result = await this.blogRepositroy.save({
      ...blogInfo,
      user: originUser,
    });

    const { user, ...data } = result;

    return data;
  }

  async findOneBlogById(id: string) {
    console.log('blogID', id);

    const blog = await this.blogRepositroy.findOne({
      where: { id: id },
    });

    console.log(blog);

    return blog;
  }

  async findBlogOneTagById(id: string) {
    try {
      const findBlog = await this.blogRepositroy.findOne({
        where: { id },
        // relations: ['blog_tag'],
        relations: { blog_tag: { tag: true } },
      });

      return findBlog;

      // return await this.blogRepositroy
      //   .createQueryBuilder('blog')
      //   .leftJoinAndSelect('blog.blog_tag', 'blog_tag')
      //   .leftJoinAndSelect('blog_tag.tag', 'tag')
      //   .where('blog.id = :id', { id: id })
      //   .getMany();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findBlogOneCommentsTagById(id: string) {
    try {
      const comments = await this.commentsRepository
        .createQueryBuilder('comments')
        // .leftJoinAndSelect('comments.subComments', 'subComments')
        .where('comments.parentComments_id IS NULL')
        .orderBy('comments.created_at', 'ASC')
        // .addOrderBy('subComments.created_at', 'ASC')
        .getMany();

      console.log('comments', comments);

      const subComments = await this.commentsRepository
        .createQueryBuilder('comments')
        // .leftJoinAndSelect('comments.subComments', 'subComments')
        .innerJoinAndSelect('comments.subComments', 'subComments')
        .where('comments.parentComments_id IS NOT NULL')
        .orderBy('comments.created_at', 'ASC')
        // .addOrderBy('subComments.created_at', 'ASC')
        .getMany();

      comments.map((parent) => parent);

      console.log('comments', comments);
      console.log('subComments', subComments);

      const blog = await this.blogRepositroy.findOne({
        where: { id: id },
        relations: ['comments'],
        order: { created_at: 'ASC' },
      });
      // const blog = await this.blogRepositroy
      //   .createQueryBuilder('blog')
      //   .leftJoinAndSelect('blog.comments', 'comments')
      //   .leftJoinAndSelect('comments.subComments', 'subComments')
      //   .getOne();

      // const blog = await this.blogRepositroy.
      //   .createQueryBuilder('blog')
      //   // .leftJoinAndSelect('blog.blog_tag', 'blog_tag')
      //   // .leftJoinAndSelect('blog_tag.tag', 'tag')
      //   .leftJoinAndSelect('blog.comments', 'comments')
      //   .leftJoinAndSelect('comments.subComments', 'subComments')
      //   .orderBy('comments.created_at', 'ASC')
      //   .addOrderBy('subComments.created_at', 'ASC')
      //   .where('blog.id = :id', { id: id })
      //   .andWhere('comments.parentComments_id IS NULL')
      //   .andWhere('subComments.parentComments_id IS NULL')
      //   .getOne();

      // console.log(blog);
      return comments;
      // return blog;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAllComments(id: string) {
    // 재귀적으로 모든 댓글과 그 하위 댓글을 조회하는 함수
    const getCommentsWithReplies = async (comment: Comment) => {
      const replies = await this.commentsRepository.find({
        where: { parentComments: { id: comment.id } },
        order: { created_at: 'ASC' },
      });

      if (replies.length > 0) {
        // subCommemts에는 할당할 동안 기다릴 필요가 없다.(재귀함수)
        comment.subComments = await Promise.all(
          replies.map((comment) => getCommentsWithReplies(comment)),
        );
      }

      // 재귀함수 종료 시점
      return comment;
    };

    const pComments = await this.commentsRepository
      .createQueryBuilder('comments')
      // .leftJoinAndSelect('comments.subComments', 'subComments')
      .where('comments.parentComments_id IS NULL')
      .orderBy('comments.created_at', 'ASC')
      // .addOrderBy('subComments.created_at', 'ASC')
      .getMany();

    const commentsWithSub = await Promise.all(
      pComments.map((comment) => {
        const result = getCommentsWithReplies(comment);

        return result;
      }),
    );

    return commentsWithSub;
  }

  async existedBlog(id: string) {
    return await this.blogRepositroy.exist({ where: { id } });
  }

  async updateBlog(originUser: User, blogInfo: UpdateBlogDto) {
    return await this.blogRepositroy.save({ ...blogInfo });
  }

  async deleteBlog(id: string) {
    try {
      await this.blogRepositroy.delete(id);

      return true;
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  async findByConuntBlog(id: string, page: number, take: number) {
    const result = await this.blogRepositroy.findAndCount({
      take: take,
      skip: (page - 1) * take,
      where: { user: { id: id } },
      order: { created_at: 'DESC' },
    });

    const [blog, total] = result;

    const paginatedBlog = {
      blogs: blog,
      blogs_count: total,
      last_page_no: Math.ceil(total / take),
    };
    return paginatedBlog;
  }

  async saveLikeChange(newLikeNum: any) {
    const result = await this.blogRepositroy.save(newLikeNum);

    return result;
  }
}
