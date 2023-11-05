import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BlogTag } from 'src/apis/blog_tag/entities/blog_tag.entity';
import { Comment } from 'src/apis/comments/entities/comments.entity';
import { User } from 'src/apis/user/entities/user.entity';
import { CommonEntity } from 'src/common/entity/common.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({
  name: 'blog',
})
export class Blog extends CommonEntity {
  @IsString()
  @IsNotEmpty({ message: '제목을 입력해주세요.' })
  @Column({ type: 'varchar' })
  title: string;

  @IsString()
  @IsOptional()
  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @IsString()
  @IsOptional()
  @Column({ type: 'text', nullable: true })
  contents?: string;

  @Column({ default: 0 })
  like_num: number;

  @ManyToOne((type) => User, (user) => user.blog, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany((type) => BlogTag, (blog_tag) => blog_tag.blog, { cascade: true })
  blog_tag: BlogTag[];

  @OneToMany((type) => Comment, (comments) => comments.blog, { cascade: true })
  comments: Comment[];
}
