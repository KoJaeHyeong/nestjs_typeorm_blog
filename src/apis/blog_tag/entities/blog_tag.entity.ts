import { Blog } from 'src/apis/blog/entities/blog.entity';
import { Tag } from 'src/apis/tag/entities/tag.entity';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'blog_tag' })
export class BlogTag {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne((type) => Blog, (blog) => blog.id)
  @JoinColumn({ name: 'blog_id' })
  blog: Blog;

  @ManyToOne((type) => Tag, (tag) => tag.id)
  @JoinColumn({ name: 'tag_id' })
  tag: Tag;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', default: null })
  delete_at: Date;
}
