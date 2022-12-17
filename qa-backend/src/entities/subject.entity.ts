import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { DepartmentEntity } from "./department.entity";

@Entity()
export class SubjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "date" })
  date: Date;

  @Column({ type: "date" })
  createdAt;

  // many subjects related to one department.
  @ManyToOne(() => DepartmentEntity, (department) => department.subjects, {
    nullable: false,
    onDelete: "CASCADE",
  })
  department: DepartmentEntity;

  @Column()
  departmentId: string;
}
