import { Controller } from '@nestjs/common';
import { BlogTagService } from './blog_tag.service';

@Controller('blog-tag')
export class BlogTagController {
  constructor(private readonly blogTagService: BlogTagService) {}
}
