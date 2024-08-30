import { Entity, Column, ObjectIdColumn, CreateDateColumn } from 'typeorm';
import { ObjectId, NumericType } from 'mongodb'; // Import ObjectId

@Entity()
export class Email {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  address: string;

  @Column()
  template: any;

  @Column({ default: 'Pending' }) // Status: Pending, Sent, Failed
  status: string;

  @Column({ default: 0 }) // Number of retries
  retryCount: any;

  @CreateDateColumn()
  createdAt: Date;
}
