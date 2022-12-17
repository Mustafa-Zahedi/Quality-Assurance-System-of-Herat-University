import { DataSource, EntityTarget, Repository, ObjectLiteral } from "typeorm";
import { QuestionEntity } from "./entities/question.entity";
import {
  UserEntity,
  FacultyEntity,
  DepartmentEntity,
  TeacherEntity,
  SubjectEntity,
  EvaluationFormEntity,
  AnswerEntity,
} from "./entities";

export const myDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: +process.env.DB_PORT || 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "qa_db",
  entities: [
    UserEntity,
    FacultyEntity,
    DepartmentEntity,
    TeacherEntity,
    SubjectEntity,
    EvaluationFormEntity,
    QuestionEntity,
    AnswerEntity,
  ],
  logging: false,
  synchronize: true,
});

export const getMyRepository = (
  model: EntityTarget<ObjectLiteral>
): Repository<any> => {
  const repo = myDataSource.getRepository(model);
  return repo;
};
