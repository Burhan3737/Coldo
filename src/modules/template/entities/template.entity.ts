import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class Template {
  @ObjectIdColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  content: string;
}
