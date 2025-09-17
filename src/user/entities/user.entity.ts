import { User as PrismaUser } from '@prisma/client'

export class User implements PrismaUser {
    name: string | null;
    id: number;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;  
}