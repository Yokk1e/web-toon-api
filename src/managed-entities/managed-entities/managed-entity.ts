import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import * as moment from 'moment';

@Entity()
export class ManagedEntity {
  // ------------------------------ ManagedEntity ------------------------------

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  // ------------------------------ SoftDelete ------------------------------

  @DeleteDateColumn()
  deletedDate: Date;

  // ------------------------------ Log ------------------------------

  @Column({
    type: Number,
    nullable: true,
    default: null,
  })
  createdBy: Number;

  @Column({
    nullable: true,
    default: null,
  })
  createdUser: string;

  @Column({
    type: Number,
    nullable: true,
    default: null,
  })
  updatedBy: Number;

  @Column({
    nullable: true,
    default: null,
  })
  updatedUser: string;

  @Column({
    type: Number,
    nullable: true,
    default: null,
  })
  deletedBy: Number;

  @Column({
    nullable: true,
    default: null,
  })
  deletedUser: string;
}
