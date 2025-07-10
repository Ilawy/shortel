import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Role, SYSTEM_ROLES } from './auth.decorator';

declare module 'express' {
  interface Request {
    user: unknown;
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[] | boolean | undefined>(
      'roles',
      context.getHandler(),
    );

    if (!roles) {
      return true;
    }
    let allowedRoles: Role[] = [];
    if (
      (Array.isArray(roles) && roles.length === 0) ||
      typeof roles === 'boolean'
    ) {
      allowedRoles = SYSTEM_ROLES as unknown as Role[];
    } else {
      allowedRoles = roles as Role[];
    }

    console.log(allowedRoles);

    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload: unknown = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    (request as unknown as { cookies: Record<string, string> }).cookies ??= {};
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if ('auth' in request.cookies && typeof request.cookies.auth === 'string') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      return request.cookies.auth;
    }

    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
