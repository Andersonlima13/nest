import { Questions } from "@prisma/client";


export class Question implements Questions {
  parentId: number | null;
  id: number;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}