import {
  Column, 
  Entity, 
  PrimaryGeneratedColumn, 
  JoinColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Position } from '../../position/entities/position.entity'

@Entity('codeqr')
export class CodeQr {
  @OneToMany(() => Position, position => position.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'string', nullable: false })
  qrcode: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user_id: User;

}
