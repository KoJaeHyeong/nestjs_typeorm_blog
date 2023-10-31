import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../user/entities/user.repository';
import { CreateBlogDto } from './dto/create.blog.dto';
import { UpdateBlogDto } from './dto/update.blog.dto';
import { BlogRepository } from './entities/blog.repository';

@Injectable()
export class BlogService {
  constructor(
    private readonly blogRepository: BlogRepository,
    private readonly UserRepository: UserRepository,
  ) {}

  async createBlog(userId: string, blogInfo: CreateBlogDto) {
    const fetchUser = await this.UserRepository.userFindById(userId);
    return await this.blogRepository.saveBlog(fetchUser, blogInfo);
  }

  async updateBlog(userId: string, blogId: string, blogInfo: UpdateBlogDto) {
    const fetchUser = await this.UserRepository.userFindById(userId);

    const fetchBlog = await this.blogRepository.findBlogById(blogId);

    if (blogInfo.like_num) {
      blogInfo.like_num = fetchBlog.like_num += 1;
    } else {
      blogInfo.like_num = fetchBlog.like_num;
    }

    const newBlog = {
      ...fetchBlog,
      ...blogInfo,
    };

    const result = await this.blogRepository.updateBlog(fetchUser, newBlog);

    const { user, ...data } = result;

    return data;
  }

  async fetchBlog(blogId: string) {
    const result = await this.blogRepository.findBlogById(blogId);

    if (!result) throw new BadRequestException('존재하지 않는 블로그입니다.');

    return result;
  }

  async deleteBlog(blogId: string) {
    const blog = await this.blogRepository.findBlogById(blogId);

    if (!blog) throw new BadRequestException('존재하지 않는 블로그입니다.');

    return await this.blogRepository.deleteBlog(blogId);
  }
}
