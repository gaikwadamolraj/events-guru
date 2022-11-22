import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { AUTH_PACKAGE_NAME, AUTH_SERVICE_NAME } from './auth.pb';
import { AuthService } from './auth.service';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE_NAME,
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: `${configService.get<string>(
              'AUTH_SERVICE_HOST',
              'localhost',
            )}:${Number(
              configService.get<number>('AUTH_SERVICE_PORT', 50051),
            )}`,
            package: AUTH_PACKAGE_NAME,
            protoPath:
              configService.get<string>('PROTO_PATH') ??
              'node_modules/eg-proto/proto/auth.proto',
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
