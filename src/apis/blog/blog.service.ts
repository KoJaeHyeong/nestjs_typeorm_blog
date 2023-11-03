import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { BlogTag } from '../blog_tag/entities/blog_tag.entity';
import { TagService } from '../tag/tag.service';
import { UserRepository } from '../user/entities/user.repository';
import { CreateBlogDto } from './dto/create.blog.dto';
import { UpdateBlogDto } from './dto/update.blog.dto';
import { BlogRepository } from './entities/blog.repository';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogTag)
    private readonly blogTagRepository: Repository<BlogTag>,
    private readonly blogRepository: BlogRepository,
    private readonly UserRepository: UserRepository,
    private readonly tagService: TagService,
  ) {}

  async createBlog(userId: string, blogInfo: CreateBlogDto) {
    try {
      let tag = [];
      const fetchUser = await this.UserRepository.userFindById(userId);

      const blog = await this.blogRepository.saveBlog(fetchUser, blogInfo);

      console.log(blogInfo.tag);

      if (blogInfo.tag) {
        tag = await this.tagService.createTag(blogInfo.tag);

        for (let i = 0; i < tag.length; i++) {
          await this.blogTagRepository.save({
            blog: blog,
            tag: tag[i],
          });
        }
      }

      blog.tag = tag; // return data값에 합침

      return blog;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // 좋아요 갯수 늘리는 로직
  // if (blogInfo.like_num) {
  //   blogInfo.like_num = fetchBlog.like_num += 1;
  // } else {
  //   blogInfo.like_num = fetchBlog.like_num;
  // }

  async updateBlog(userId: string, blogId: string, blogInfo: UpdateBlogDto) {
    try {
      let tagList: any[] = [];
      let createdTagList: any[] = [];
      let orignTagList: any[] = [];

      const fetchUser = await this.UserRepository.userFindById(userId);
      const fetchBlog = await this.blogRepository.findBlogOneTagById(blogId);

      if (!fetchBlog)
        throw new BadRequestException('blog가 존재하지 않습니다.');

      if (!fetchUser)
        throw new BadRequestException('유저가 존재하지 않습니다.');

      const { tag, ...updateInfo } = blogInfo;
      const { blog_tag, ...originBlog } = fetchBlog;

      // tag 내용 변경 없을 시 => tag_list 설정
      tagList = blog_tag.map((blog) => blog.tag);

      console.log('first', tagList);

      for (let el of blog_tag) {
        orignTagList.push(el.tag);
      }

      const newBlog = {
        ...originBlog,
        ...updateInfo,
      };

      const deletedList = orignTagList
        .filter((item) => !tag.includes(item.tag_name))
        .map((tag) => tag.id);

      const addList = tag.filter(
        (item) => !orignTagList.map((el) => el.tag_name).includes(item),
      );
      console.log('addList', addList);
      console.log('deletedList', deletedList);

      if (deletedList.length > 0) {
        // delete 한다 deletedList에 있는 요소
        await this.blogTagRepository.delete({
          blog: { id: originBlog.id },
          tag: { id: In(deletedList) },
        });
        // tagList에서 deletedList의 id에 해당하는 값 제거
        tagList = tagList.filter((tag) => !deletedList.includes(tag.id));
      }

      if (addList.length > 0) {
        // 1. 기존에 그 tag가 있는지 확인 (tag_table)
        // 2. 있으면, (blog_tag_table)에 바로 저장
        // 3. 없으면, 그 tag를 추가한다. (tag_table)
        // 4. 3번을 하고나면, blog_tag_table에 바로 저장 (blog_tag_table)
        createdTagList = await this.tagService.createTag(addList);

        for (let i = 0; i < createdTagList.length; i++) {
          await this.blogTagRepository.save({
            blog: newBlog,
            tag: createdTagList[i],
          });
        }

        tagList = tagList.concat(createdTagList);
      }

      const updateBlog = await this.blogRepository.updateBlog(
        fetchUser,
        newBlog,
      );

      updateBlog.tag = tagList;

      return updateBlog;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async fetchBlog(blogId: string) {
    const result = await this.blogRepository.findBlogOneCommentsTagById(blogId);

    if (!result) throw new BadRequestException('존재하지 않는 블로그입니다.');
    const { blog_tag, ...blog } = result;
    console.log('BLOG', blog);

    const tagList = blog_tag.map((blog_tag) => blog_tag.tag);

    console.log('tagList', tagList);

    blog['tags'] = tagList;

    return blog;
  }

  async fetchAllBlog(id: string, page: number, take: number) {
    return await this.blogRepository.findByConuntBlog(id, page, take);
  }

  async deleteBlog(blogId: string) {
    const blog = await this.blogRepository.findBlogOneCommentsTagById(blogId);

    if (!blog) throw new BadRequestException('존재하지 않는 블로그입니다.');

    return await this.blogRepository.deleteBlog(blogId);
  }
}
