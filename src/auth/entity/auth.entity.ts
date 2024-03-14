import { UserCampingLikesEntity } from 'src/like/entity/like.entity';
import { UserCampingReviewsEntity } from 'src/review/entity/review.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class AuthEntity {
  @PrimaryGeneratedColumn()
  userID: number; // userID 필드에 PrimaryGeneratedColumn 사용

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  picture: string;

  @OneToMany(
    () => UserCampingLikesEntity,
    (userCampingLike) => userCampingLike.user,
  )
  userCampingLikse: UserCampingLikesEntity[];

  @OneToMany(
    () => UserCampingReviewsEntity,
    (userCampingReview) => userCampingReview.user,
  )
  userCampingReveiws: UserCampingReviewsEntity[];
}
