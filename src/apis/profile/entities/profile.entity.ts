import { IsString } from 'class-validator';
import { CommonEntity } from 'src/common/entity/common.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'profile',
})
export class Profile extends CommonEntity {
  @IsString()
  @Column({ type: 'text', name: 'intro', nullable: true })
  intro: string;

  @IsString()
  @Column({ type: 'varchar', nullable: true })
  site: string;

  // @OneToOne((type) => User, (user) => user.profile)
  // user: User;
}
