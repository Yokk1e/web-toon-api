import { Entity, Column, OneToMany } from 'typeorm';
import { ManagedEntity } from '../../managed-entities/managed-entities/managed-entity';

@Entity()
export class Catagory extends ManagedEntity {
  @Column({ length: 255 })
  name: string;
}
