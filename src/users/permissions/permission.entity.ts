import { Entity, Column } from 'typeorm';
import { ManagedEntity } from '../../managed-entities/managed-entities/managed-entity';

@Entity()
export class Permission extends ManagedEntity {
  @Column({ length: 255 })
  name: string;
}
