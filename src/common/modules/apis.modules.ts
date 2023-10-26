import { AuthModule } from 'src/apis/auth/auth.module';
import { BlogModule } from 'src/apis/blog/blog.module';
import { BlogTagModule } from 'src/apis/blog_tag/blog_tag.module';
import { ProfileModule } from 'src/apis/profile/profile.module';
import { TagModule } from 'src/apis/tag/tag.module';
import { UsersModule } from 'src/apis/user/users.module';

export const apiModules = [
  UsersModule,
  ProfileModule,
  BlogModule,
  BlogTagModule,
  TagModule,
  AuthModule,
  // VisitorModule,
];
