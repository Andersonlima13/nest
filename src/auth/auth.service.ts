import { Inject, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/database/prisma.service';
import { LoginDto } from 'src/DTO/LoginDto';


@Injectable()
export class AuthService {
    @Inject()
    private readonly UserService: UserService;

    @Inject()
    private jwtService: JwtService;

    @Inject()
    private readonly prisma: PrismaService;

    async createUser(data: Prisma.UserCreateInput) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;
        return this.prisma.user.create({ data : {...data, password: hashedPassword} });
    }

    async loginUser(params: LoginDto): Promise<{ access_token: string }> {
        const user = await this.UserService.getUserByEmail(params.email);
            if (!user) { throw new Error('Invalid credentials'); }
        const isPasswordValid = await bcrypt.compare(params.password, user.password);
            if (!isPasswordValid) { throw new Error('Invalid credentials'); }
        const payload = { sub: user.id, email: user.email };
        const access_token = this.jwtService.sign(payload);
            return { access_token };
    }

}
