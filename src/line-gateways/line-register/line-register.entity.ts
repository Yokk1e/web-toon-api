import { Entity, Column, Index } from 'typeorm';
import { ManagedEntity } from '../../managed-entities/managed-entities/managed-entity';

@Entity()
export class LineRegister extends ManagedEntity {
  @Column({ length: 255, unique: true })
  @Index('userId')
  userId: string;
}
