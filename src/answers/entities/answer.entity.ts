import { User } from "src/user/entities/user.entity";
import { Answers } from "@prisma/client";
import { Question } from "src/questions/entities/question.entity";

export class Answer implements Answers {
  id: number;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  questionId: number;
  question: Question;
  user : User;
}