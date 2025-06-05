import { IsNumber, IsUrl, Length, Min } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Offer } from '../../offers/entities/offer.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ length: 250 })
  @Length(1, 250)
  name: string;

  @Column()
  @IsUrl()
  link: string;

  @Column()
  @IsUrl()
  image: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsNumber()
  @Min(1)
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  raised: number;

  @ManyToOne(() => User, (user) => user.wishes)
  @JoinColumn()
  owner: User;

  @Column({ length: 1024 })
  @Length(1, 1024)
  description: string;

  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];

  @Column({ default: 0 })
  copied: number;
}
