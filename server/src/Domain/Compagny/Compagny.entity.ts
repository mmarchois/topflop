import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Compagny {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar', nullable: false })
  public name: string;

  @Column({ type: 'varchar', nullable: true })
  public voucher: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  constructor(compagny: Partial<Compagny>) {
    Object.assign(this, compagny);
  }
}
