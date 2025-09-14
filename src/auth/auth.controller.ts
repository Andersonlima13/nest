import { Body, Controller,Get,HttpCode,HttpStatus,Param,Post } from '@nestjs/common';
import { Prisma, User as UserModel } from '@prisma/client';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    async singnupUser(
        @Body() userData: Prisma.UserCreateInput,
    ):Promise<UserModel> {
        return this.authService.createUser(userData)
    }

    @Post('signin')
    @HttpCode(HttpStatus.OK)

    async signin(
        @Body() userData: Prisma.UserCreateInput,
    ): Promise<{ access_token: string }> {
        return this.authService.loginUser(userData);
    }

}