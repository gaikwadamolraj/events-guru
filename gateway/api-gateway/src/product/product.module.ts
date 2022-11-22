import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductController } from './product.controller';
import { PRODUCT_PACKAGE_NAME, PRODUCT_SERVICE_NAME } from './product.pb';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: PRODUCT_SERVICE_NAME,
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: `${configService.get<string>(
              'PRODUCT_SERVICE_HOST',
              'localhost',
            )}:${configService.get<number>('PRODUCT_SERVICE_PORT', 50053)}`,
            package: PRODUCT_PACKAGE_NAME,
            protoPath: 'node_modules/eg-proto/proto/product.proto',
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [ProductController],
})
export class ProductModule {}
