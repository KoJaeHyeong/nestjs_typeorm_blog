import { IsUUID } from 'class-validator';
import { format } from 'date-fns';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class CommonEntity {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    type: 'timestamp',
    transformer: {
      to: (value) => value,
      from: (value) => {
        if (value instanceof Date) {
          return format(value, 'yyyy-MM-dd HH:mm:ss');
        }
        return value;
      },
    },
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    transformer: {
      to: (value) => value,
      from: (value) => {
        if (value instanceof Date) {
          return format(value, 'yyyy-MM-dd HH:mm:ss');
        }
        return value;
      },
    },
  })
  updated_at: Date;

  // @Exclude()
  // @DeleteDateColumn({ type: 'timestamp', default: null })
  // delete_at: Date;
}
