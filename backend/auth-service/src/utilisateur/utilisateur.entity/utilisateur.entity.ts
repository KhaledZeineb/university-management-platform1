import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Utilisateur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column({ unique: true })
  email: string;

  @Column()
  cin: string;

  @Column()
  mdp_hash: string;

  @Column()
  role: string;

  @Column({ default: true })
  doit_changer_mdp: boolean;

  @Column({ default: false })
  emailConfirmed: boolean;

  @Column({ type: 'varchar', nullable: true })
  confirmationToken: string | null; 

  @Column({ nullable: true })
  resetToken: string;

  @Column({ nullable: true })
  resetTokenExpires: Date;
  
}