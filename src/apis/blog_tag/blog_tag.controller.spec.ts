import { Test, TestingModule } from '@nestjs/testing';
import { BlogTagController } from './blog_tag.controller';
import { BlogTagService } from './blog_tag.service';

describe('BlogTagController', () => {
  let controller: BlogTagController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogTagController],
      providers: [BlogTagService],
    }).compile();

    controller = module.get<BlogTagController>(BlogTagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
