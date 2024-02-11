import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, name: 'name' })
  name: string;

  @Column({ nullable: true, name: 'address' })
  address: string;

  @Column({ nullable: true, name: 'dl_expiry_date' })
  dlExpiryDate: string;
}
