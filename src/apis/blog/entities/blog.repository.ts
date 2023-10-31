import { Logger } from '@nestjs/common';
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

  async findBlogById(id: string) {
    return await this.blogRepositroy.findOne({
      where: { id },
    });
  }

  async updateBlog(originUser: User, blogInfo: UpdateBlogDto) {
    return await this.blogRepositroy.save({ ...blogInfo, user: originUser });
  }

  async deleteBlog(id: string) {
    try {
      await this.blogRepositroy.delete(id);

      return true;
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
