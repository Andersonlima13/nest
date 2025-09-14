import { Body, Controller,Get,Param,Post } from '@nestjs/common';
import { Prisma, User as UserModel } from '@prisma/client';
import { UserService } from './user.service';


@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('profiles')
    async getAllUsers(): Promise<UserModel[] | null> {
        return this.userService.getAllUsers();

    }

    @Get('profiles/:id')
    async getUserById(@Param('id') id: string): Promise<UserModel | null> {
        return this.userService.getUserById(id);
    }


    @Post('delete/:id')
    async deleteUserById(@Param('id') id: string): Promise<UserModel | null> {
        return this.userService.deleteUserById(id);
    }   


}