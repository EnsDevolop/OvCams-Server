import { UserCampingLikesEntity } from 'src/like/entity/like.entity';
import { UserCampingReviewsEntity } from 'src/review/entity/review.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class CampingEntity {
  @PrimaryGeneratedColumn()
  campingID: number; // campingID 필드에 PrimaryGeneratedColumn 사용

  @Column({ type: 'int', default: 0 })
  recommend: number;

  @Column({ type: 'varchar' })
  placeName: string;

  @Column({ type: 'varchar' })
  country: string;

  @Column({ type: 'varchar', unique: true })
  address: string;

  @Column({ type: 'varchar', unique: true })
  number: string;

  @Column({ type: 'simple-array' })
  period: string[];

  @Column({ type: 'varchar', unique: true, nullable: true })
  homepage: string;

  @Column({ type: 'varchar' })
  content: string;

  @Column({ type: 'simple-array' })
  facility: string[];

  @OneToMany(
    () => UserCampingLikesEntity,
    (userCampingLike) => userCampingLike.camping,
  )
  userCampingLikes: UserCampingLikesEntity[];

  @OneToMany(
    () => UserCampingReviewsEntity,
    (userCampingRevies) => userCampingRevies.camping,
  )
  reviews: UserCampingReviewsEntity[];

  like: boolean;
}
