import { IsNotEmpty, IsString } from 'class-validator';
import { Blog } from 'src/apis/blog/entities/blog.entity';
import { User } from 'src/apis/user/entities/user.entity';
import { CommonEntity } from 'src/common/entity/common.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({
  name: 'comments',
})
export class Comment extends CommonEntity {
  @IsString()
  @IsNotEmpty({ message: '댓글을 입력해주세요.' })
  @Column({ type: 'text' })
  comments: string;

  @ManyToOne((type) => Blog, (blog) => blog.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'blog_id' })
  blog: Blog;

  @ManyToOne((type) => User, (user) => user.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  // 댓글
  @OneToMany((type) => Comment, (subComments) => subComments.parentComments, {
    cascade: true,
  })
  subComments: Comment[];

  // 대댓글
  @ManyToOne(
    (type) => Comment,
    (parentComments) => parentComments.subComments,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'parentComments_id' })
  parentComments: Comment;
}
