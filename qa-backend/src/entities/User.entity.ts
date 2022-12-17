import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { FacultyEntity } from "./faculty.entity";

enum GENDER {
  MALE = "male",
  FEMALE = "female",
}

enum STATUS {
  ACTIVE = "active",
  BLOCK = "block",
}
@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: false })
  is_super_admin: boolean;

  @Column({ unique: true, nullable: false })
  userName: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({
    type: "simple-enum",
    enum: STATUS,
    default: STATUS.ACTIVE,
  })
  status;

  @Column({
    type: "simple-enum",
    enum: GENDER,
    default: GENDER.MALE,
  })
  gender;

  @Column({ type: "date" })
  createdAt;

  @OneToOne(() => FacultyEntity, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn()
  faculty;
}
