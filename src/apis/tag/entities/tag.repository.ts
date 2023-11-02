import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateTagDto } from '../dto/create.tag.dto';
import { Tag } from './tag.entity';

export class TagRepository {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async saveTag(tagInfo: CreateTagDto) {
    let tagList = [];

    for (let tagName of tagInfo.tag_name) {
      const saveTag = await this.tagRepository.save({ tag_name: tagName });
      tagList.push(saveTag);
    }

    return tagList;
  }

  async existTagName(tagName: string) {
    return await this.tagRepository.exist({ where: { tag_name: tagName } });
  }

  async findTagName(tagName: string[]) {
    const result = await this.tagRepository.find({
      where: { tag_name: In(tagName) },
    });

    console.log('findTagName', result);

    return result;
  }
}
