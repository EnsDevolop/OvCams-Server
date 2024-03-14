import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AuthEntity } from 'src/auth/entity/auth.entity';
import { CampingEntity } from 'src/camping/entity/camping.entity';

@Entity()
export class UserCampingReviewsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AuthEntity)
  user: AuthEntity;

  @ManyToOne(() => CampingEntity)
  camping: CampingEntity;

  @Column({ type: 'varchar' })
  content: string;
}
