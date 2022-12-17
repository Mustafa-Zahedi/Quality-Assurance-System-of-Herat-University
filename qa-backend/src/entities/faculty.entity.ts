import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { DepartmentEntity } from "./department.entity";

@Entity()
export class FacultyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  fa_name: string;

  @Column({ unique: true })
  en_name: string;

  @Column({ type: "date" })
  date: Date;

  @Column({ type: "date" })
  createdAt;

  // one faculty has many departments! relationship done.

  @OneToMany(() => DepartmentEntity, (department) => department.faculty, {
    onDelete: "CASCADE",
  })
  departments: DepartmentEntity[];
}
