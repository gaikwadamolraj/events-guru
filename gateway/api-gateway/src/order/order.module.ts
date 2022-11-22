import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrderController } from './order.controller';
import { ORDER_PACKAGE_NAME, ORDER_SERVICE_NAME } from './order.pb';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: ORDER_SERVICE_NAME,
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: `${configService.get<string>(
              'ORDER_SERVICE_HOST',
              'localhost',
            )}:${configService.get<number>('ORDER_SERVICE_PORT', 50052)}`,
            package: ORDER_PACKAGE_NAME,
            protoPath:
              configService.get<string>('PROTO_PATH') ??
              'node_modules/eg-proto/proto/order.proto',
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [OrderController],
})
export class OrderModule {}
