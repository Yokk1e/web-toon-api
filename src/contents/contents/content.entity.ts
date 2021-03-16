import { Entity, Column, OneToMany } from 'typeorm';
import { Episode } from '../episodes/episode.entity';
import { ManagedEntity } from '../../managed-entities/managed-entities/managed-entity';

@Entity()
export class Content extends ManagedEntity {
  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ length: 255, nullable: true })
  imageFilename: string;

  @OneToMany(
    type => Episode,
    episode => episode.content,
    { cascade: true, eager: true, nullable: true },
  )
  episodes: Episode[];
}
