import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AuthEntity } from 'src/auth/entity/auth.entity';
import { CampingEntity } from 'src/camping/entity/camping.entity';

@Entity()
export class UserCampingLikesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AuthEntity)
  user: AuthEntity;

  @ManyToOne(() => CampingEntity)
  camping: CampingEntity;

  @Column({ type: 'boolean', default: false })
  is_Valid: boolean;

  @Column({ default: 1 })
  is_Count: number;
}
