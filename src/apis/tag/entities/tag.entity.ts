import { IsNotEmpty } from 'class-validator';
import { BlogTag } from 'src/apis/blog_tag/entities/blog_tag.entity';
import { CommonEntity } from 'src/common/entity/common.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({
  name: 'tag',
})
export class Tag extends CommonEntity {
  @IsNotEmpty({ message: '빈칸을 채워주세요' })
  @Column({ type: 'varchar', name: 'tag_name' })
  tag_name: string;

  @OneToMany((type) => BlogTag, (blog_tag) => blog_tag.tag)
  blog_tag: BlogTag[];
}
