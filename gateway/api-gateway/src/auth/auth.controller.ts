import {
  Body,
  Controller,
  Inject,
  Logger,
  OnModuleInit,
  Post,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  AuthServiceClient,
  AUTH_SERVICE_NAME,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from './auth.pb';

@Controller('auth')
export class AuthController implements OnModuleInit {
  private authSvc: AuthServiceClient;

  @Inject(AUTH_SERVICE_NAME)
  private readonly authClient: ClientGrpc;

  private readonly logger = new Logger(AuthController.name);

  public onModuleInit(): void {
    this.authSvc =
      this.authClient.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  @Post('register')
  private async register(
    @Body() body: RegisterRequest,
  ): Promise<Observable<RegisterResponse>> {
    return this.authSvc.register(body);
  }

  @Post('login')
  private async login(
    @Body() body: LoginRequest,
  ): Promise<Observable<LoginResponse>> {
    return this.authSvc.login(body);
  }
}
