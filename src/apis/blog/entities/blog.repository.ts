import { InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
  ) {}
  async saveBlog(originUser: User, blogInfo: CreateBlogDto) {
    const result = await this.blogRepositroy.save({
      ...blogInfo,
      user: originUser,
    });

    const { user, ...data } = result;

    return data;
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
      // const blog = await this.blogRepositroy.findOne({
      //   where: { id },
      //   relations: { comments: { subComments: true } },
      //   order: { created_at: 'ASC' },
      // });
      const blog = await this.blogRepositroy
        .createQueryBuilder('blog')
        .leftJoinAndSelect('blog.blog_tag', 'blog_tag')
        .leftJoinAndSelect('blog_tag.tag', 'tag')
        .leftJoinAndSelect('blog.comments', 'comments')
        .leftJoinAndSelect('comments.subComments', 'subComments')
        .orderBy('comments.created_at', 'ASC')
        .addOrderBy('subComments.created_at', 'ASC')
        .where('blog.id = :id', { id: id })
        // .andWhere('comments.parentComments_id IS NULL')
        .getOne();

      console.log(blog);

      return blog;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
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

  // async likeChange(blogId())
}
