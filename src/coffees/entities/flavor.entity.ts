import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Coffee } from './coffee.entity';

@Entity()
export class Flavor {
  // FlavorEntity - без суфикса что бы в таблицк БД его не было
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @ManyToMany(
    type => Coffee,
    coffee => coffee.flavors,
  )
  coffees: Coffee[];
}
