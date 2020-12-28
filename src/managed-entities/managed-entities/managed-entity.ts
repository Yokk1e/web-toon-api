import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
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

  @Column({
    type: 'boolean',
    default: true,
  })
  active: boolean;

  @Column({
    type: 'datetime',
    precision: 6,
    nullable: true,
  })
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

  public softDelete() {
    if (this.active) {
      this.active = false;
      this.deletedDate = moment().add(7, 'hours').toDate();
    }
  }

  public restore() {
    if (!this.active) {
      this.active = true;
      this.deletedDate = null;
    }
  }
}
