import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ValidateResponse } from './auth.pb';
import { AuthService } from './auth.service';
import { Request } from 'express';

export interface IGetUserAuthInfoRequest extends Request {
  user: number;
}

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject(AuthService)
  public readonly authService: AuthService;

  public async canActivate(ctx: ExecutionContext): Promise<boolean> | never {
    const req: IGetUserAuthInfoRequest = ctx.switchToHttp().getRequest();
    const authorization: string = req.headers['authorization'];

    if (!authorization) throw new UnauthorizedException();
    const bearer: string[] = authorization.split(' ');
    if (!bearer || bearer.length < 2) throw new UnauthorizedException();

    const [, token] = bearer;
    const { status, userId }: ValidateResponse =
      await this.authService.validate(token);

    if (status !== HttpStatus.OK) throw new UnauthorizedException();
    req.user = userId;

    return true;
  }
}
