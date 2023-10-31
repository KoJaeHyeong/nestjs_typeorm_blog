import { IsOptional, IsString } from 'class-validator';
import { User } from 'src/apis/user/entities/user.entity';
import { CommonEntity } from 'src/common/entity/common.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity({
  name: 'profile',
})
export class Profile extends CommonEntity {
  @IsString()
  @IsOptional()
  @Column({ type: 'text', name: 'intro', nullable: true })
  intro?: string;

  @IsString()
  @IsOptional()
  @Column({ type: 'varchar', name: 'site', nullable: true })
  site?: string;

  @OneToOne((type) => User, (user) => user.profile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
