import { Entity, Column, ManyToOne } from 'typeorm';
import { Content } from '../contents/content.entity';
import { ManagedEntity } from '../../managed-entities/managed-entities/managed-entity';

@Entity()
export class Episode extends ManagedEntity {
  @Column({ length: 255 })
  title: string;

  @Column({ length: 255, nullable: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', default: null, nullable: true })
  link: string;

  @ManyToOne(
    type => Content,
    content => content.episodes,
  )
  content: Content;
}
