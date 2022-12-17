import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { FacultyEntity } from "./faculty.entity";
import { SubjectEntity } from "./subject.entity";
import { TeacherEntity } from "./teacher.entity";

@Entity()
export class DepartmentEntity {
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
  // many departments related to one faculty.
  @ManyToOne(() => FacultyEntity, (faculty) => faculty.departments, {
    nullable: false,
    onDelete: "CASCADE",
  })
  faculty: FacultyEntity;

  @Column()
  facultyId: string;

  //one department has many teachers
  @OneToMany(() => TeacherEntity, (teacher) => teacher.department, {
    nullable: true,
    onDelete: "CASCADE",
  })
  teachers: TeacherEntity[];

  //one department has many subjects
  @OneToMany(() => SubjectEntity, (subject) => subject.department, {
    nullable: true,
    onDelete: "CASCADE",
  })
  subjects: SubjectEntity[];
}
