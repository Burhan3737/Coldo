import { Entity, Column, ObjectIdColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Email {
  @ObjectIdColumn()
  id: string;

  @Column()
  address: string;

  @Column()
  templateId: string;

  @CreateDateColumn()
  createdAt: Date;
}
