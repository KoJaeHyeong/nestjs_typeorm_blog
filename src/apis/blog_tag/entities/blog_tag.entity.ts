import { Blog } from 'src/apis/blog/entities/blog.entity';
import { Tag } from 'src/apis/tag/entities/tag.entity';
import { CommonEntity } from 'src/common/entity/common.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'blog_tag' })
export class BlogTag extends CommonEntity {
  @ManyToOne((type) => Blog, (blog) => blog.blog_tag, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'blog_id' })
  blog: Blog;

  @ManyToOne((type) => Tag, (tag) => tag.blog_tag)
  @JoinColumn({ name: 'tag_id' })
  tag: Tag;

  // @CreateDateColumn({ type: 'timestamp' })
  // created_at: Date;

  // @UpdateDateColumn({ type: 'timestamp' })
  // updated_at: Date;

  // @DeleteDateColumn({ type: 'timestamp', default: null })
  // delete_at: Date;
}
