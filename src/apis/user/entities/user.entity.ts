import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { CommonEntity } from 'src/common/entity/common.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'user',
})
export class User extends CommonEntity {
  @IsString()
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
}
