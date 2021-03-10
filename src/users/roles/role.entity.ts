import { Entity, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { ManagedEntity } from '../../managed-entities/managed-entities/managed-entity';

import { Permission } from '../permissions/permission.entity';
import { User } from '../users/user.entity';

@Entity()
export class Role extends ManagedEntity {
  @Column({ length: 255 })
  name: string;

  @ManyToMany(type => Permission)
  @JoinTable()
  permissions: Permission[];

  @OneToMany(
    type => User,
    user => user.role,
  )
  users: User[];
}
