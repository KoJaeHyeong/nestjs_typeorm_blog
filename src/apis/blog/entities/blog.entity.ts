import { IsNotEmpty } from 'class-validator';
import { BlogTag } from 'src/apis/blog_tag/entities/blog_tag.entity';
import { User } from 'src/apis/user/entities/user.entity';
import { CommonEntity } from 'src/common/entity/common.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({
  name: 'blog',
})
export class Blog extends CommonEntity {
  @IsNotEmpty({ message: '제목을 입력해주세요.' })
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  contents: string;

  @Column({ default: 0 })
  like_num: number;

  @ManyToOne((type) => User, (user) => user.blog)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany((type) => BlogTag, (blog_tag) => blog_tag.blog)
  blog_tag: BlogTag[];
}
