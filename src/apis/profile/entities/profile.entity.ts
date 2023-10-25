import { User } from 'src/apis/user/entities/user.entity';
import { CommonEntity } from 'src/common/entity/common.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity({
  name: 'profile',
})
export class Profile extends CommonEntity {
  @Column({ type: 'text', name: 'intro', nullable: true })
  intro: string;

  @Column({ type: 'varchar', nullable: true })
  site: string;

  @OneToOne((type) => User, (user) => user.profile)
  user: User;
}
