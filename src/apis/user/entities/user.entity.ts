import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { CommonEntity } from 'src/common/entity/common.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'user',
})
export class User extends CommonEntity {
  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', name: 'email' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: '이름을 작성해주세용' })
  @Column({ type: 'varchar', name: 'name' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', name: 'password' })
  password: string;

  @IsBoolean()
  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;
}
