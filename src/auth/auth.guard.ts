import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
@Injectable()
export class AuthGuard implements CanActivate {
  @Inject()
  private readonly jwtService: JwtService


   async canActivate( context: ExecutionContext ): Promise<boolean>  {
    const request = context.switchToHttp().getRequest();
    const authorization = this.extractTokenFromHeader(request);
    if (!authorization) throw new UnauthorizedException('Acesso não autorizado');
    try {
        const payload = await this.jwtService.verifyAsync(authorization, {
            secret: process.env.JWT_SECRET,
        });
        request['user'] = payload;
    } catch {
        throw new UnauthorizedException('Token invalido');
    }
      return true;
  }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers['authorization']?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

}

