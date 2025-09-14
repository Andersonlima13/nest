import { Inject, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';


@Injectable()
export class UserService {
    @Inject()
    private readonly prisma: PrismaService;

    async createUser(data: Prisma.UserCreateInput) {
        return this.prisma.user.create({ data });
    }


    async updateUser(params: { where: Prisma.UserWhereUniqueInput; data: Prisma.UserUpdateInput }): Promise<User> {
        const { where, data } = params;
        return this.prisma.user.update({ where, data });
    }
    

    async deleteUserById(id: string): Promise<User> {
        return this.prisma.user.delete({ 
            where: { id: Number(id) } ,
        });
    }

    async getAllUsers(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    
    async getUserById(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { id: Number(id) },
        });
    }




    
}
