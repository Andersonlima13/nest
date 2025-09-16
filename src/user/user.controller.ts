import { Body, Controller,Get,Param,Post, UseGuards } from '@nestjs/common';
import { Prisma, User as UserModel } from '@prisma/client';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';


@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}


    @UseGuards(AuthGuard)
    @Get('profiles')
    async getAllUsers(): Promise<UserModel[] | null> {
        return this.userService.getAllUsers();

    }
    
    @UseGuards(AuthGuard)
    @Get('profiles/:id')
    async getUserById(@Param('id') id: string): Promise<UserModel | null> {
        return this.userService.getUserById(id);
    }



    @UseGuards(AuthGuard)
    @Post('delete/:id')
    async deleteUserById(@Param('id') id: string): Promise<UserModel | null> {
        return this.userService.deleteUserById(id);
    }   


}