import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class QuestionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column({
    type : 'boolean',
    default : true
  })
  status : boolean
}
