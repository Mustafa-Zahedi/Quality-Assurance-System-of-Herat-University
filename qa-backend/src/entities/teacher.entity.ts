import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { DepartmentEntity } from "./department.entity";

enum GENDER {
  MALE = "male",
  FEMALE = "female",
}

@Entity()
export class TeacherEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fa_name: string;

  @Column()
  en_name: string;

  @Column({ type: "date" })
  date: Date;

  @Column({ type: "date" })
  createdAt;

  @Column({
    type: "simple-enum",
    enum: GENDER,
    default: GENDER.MALE,
  })
  gender;

  @Column()
  type: string;

  @Column()
  state: string;

  @Column()
  des: string;

  // many teachers related to one department.
  @ManyToOne(() => DepartmentEntity, (department) => department.teachers, {
    nullable: false,
    onDelete: "CASCADE",
  })
  department: DepartmentEntity;

  @Column()
  departmentId: string;
}
