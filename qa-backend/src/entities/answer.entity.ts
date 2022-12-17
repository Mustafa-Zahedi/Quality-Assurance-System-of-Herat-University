import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { EvaluationFormEntity } from "./evaluation-form.entity";
import { QuestionEntity } from "./question.entity";

export enum RESPONSES {
  VERY_LOW = 0,
  LOW = 1,
  MEDIUM = 2,
  HEIGH = 3,
  VERY_HEIGH = 4,
}
@Entity()
export class AnswerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "simple-json",
  })
  response: Record<number, any>;

  @ManyToOne(() => EvaluationFormEntity, (evaluation) => evaluation.answers, {
    onDelete: "CASCADE",
  })
  evaluationForm: EvaluationFormEntity;

  @Column()
  evaluationFormId: string;
}
