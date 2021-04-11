import { Entity, Column, ManyToOne } from 'typeorm';
import { Content } from '../../contents/contents/content.entity';
import { ManagedEntity } from '../../managed-entities/managed-entities/managed-entity';

@Entity()
export class Item extends ManagedEntity {
  @Column({ length: 255, nullable: true })
  image: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255, nullable: true })
  description: string;

  @Column()
  price: number;

  @ManyToOne(
    type => Content,
    content => content.items,
  )
  content: Content;
}
