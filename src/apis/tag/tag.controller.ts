import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TagService } from './tag.service';

// @UseInterceptors(ResponseInterceptor)
// @UseFilters(HttpExceptionFilter)
@ApiTags('Tag')
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  // @ApiOperation({
  //   summary: 'tag 등록',
  // })
  // @ApiBearerAuth('access_token')
  // @UseGuards(JwtAuthGuard)
  // @Post()
  // async createTag(@Body() body: CreateTagDto) {
  //   // return await this.tagService.createTag(body);
  // }
}
