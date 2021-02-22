import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { CodeQr } from '../../codeqr/entities/codeqr.entity';
import { Institutions } from '../../institutions/entities/institutions.entity';
import { TypeUser } from '../../typeuser/entities/typeuser.entity';
import { Position } from '../../position/entities/position.entity';
import { Health } from '../../health/entities/health.entity';

@Entity('user')
export class User {
  @OneToMany(() => CodeQr, (codeQr) => codeQr.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @OneToMany(() => Position, (pos) => pos.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @OneToMany(() => Health, (health) => health.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  address: string;

  @Column({ type: 'varchar', nullable: false })
  id_document: string;

  @Column({ type: 'varchar', nullable: false })
  pictures: string;

  @Column({ type: 'varchar', nullable: false })
  contact_emergencies: string;

  @ManyToOne(() => Institutions, (ins) => ins.id)
  @JoinColumn({ name: 'institutions_id' })
  institutions_id: Institutions;

  @ManyToOne(() => TypeUser, (typeuser) => typeuser.id)
  @JoinColumn({ name: 'type_user_id' })
  type_user_id: TypeUser;
}
