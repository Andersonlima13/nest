import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthGuard } from './auth.guard';


@Module({
  imports: [forwardRef(() => UserModule), DatabaseModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1h' },})],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthService,AuthGuard,JwtModule],
})
export class AuthModule {}
