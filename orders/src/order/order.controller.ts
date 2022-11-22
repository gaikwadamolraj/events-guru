import { Controller, Inject, Logger, UsePipes } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateOrderRequestDto } from './order.dto';
import { OrderService } from './order.service';
import { ValidationPipe } from './pipes/validation.pipe';
import { CreateOrderResponse, ORDER_SERVICE_NAME } from './proto/order.pb';

@Controller('order')
export class OrderController {
  private readonly logger = new Logger(OrderController.name);

  @Inject(OrderService)
  private readonly service: OrderService;

  @GrpcMethod(ORDER_SERVICE_NAME, 'CreateOrder')
  @UsePipes(new ValidationPipe())
  private async createOrder(
    data: CreateOrderRequestDto,
  ): Promise<CreateOrderResponse> {
    console.log('[order create]');
    return this.service.createOrder(data);
  }
}
