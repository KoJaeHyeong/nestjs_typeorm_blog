import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Blog } from 'src/apis/blog/entities/blog.entity';
import { Profile } from 'src/apis/profile/entities/profile.entity';
import { CommonEntity } from 'src/common/entity/common.entity';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

@Entity({
  name: 'user',
})
export class User extends CommonEntity {
  @IsString()
  @IsEmail({}, { message: '이메일 형식이 올바르지 않습니다.' })
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  @Column({ type: 'varchar', name: 'email' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: '이름을 입력해주세요.' })
  @Column({ type: 'varchar', name: 'name' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: '비밀번호를 확인해주세요.' })
  @Column({ type: 'varchar', name: 'password' })
  password: string;

  @IsBoolean()
  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;

  @OneToOne((type) => Profile, (profile) => profile.user, {
    cascade: true,
  })
  // @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  @OneToMany((type) => Blog, (blog) => blog.user)
  blog: Blog[];
}
