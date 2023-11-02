import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { TagRepository } from './entities/tag.repository';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  async createTag(tagInfo: string[]) {
    try {
      let existTagName: string[] = [];
      // blog등록 시 tag 내용을 저장할 수도 있기 때문
      // 1. tag 저장 시 이미 db에 있으면 그대로 반환. => tag_table에 있는 값을 ManyToMany로 묶어 사용 하기 위함.
      // 2. tag 저장 시 db에 없으면 저장.
      const findedTagName = await this.tagRepository.findTagName(tagInfo);
      console.log('findedTagName', findedTagName);

      if (findedTagName.length !== tagInfo.length) {
        for (let tag of findedTagName) {
          existTagName.push(tag.tag_name);
        }

        // db에 존재하는 태그와 비교 => param에서 존재하는 값 제거

        const divideTag = tagInfo.filter((el) => !existTagName.includes(el));

        const tagData = await this.tagRepository.saveTag({
          tag_name: divideTag,
        });

        const resultTagList = findedTagName.concat(tagData);

        return resultTagList;
      } else {
        return findedTagName;
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
