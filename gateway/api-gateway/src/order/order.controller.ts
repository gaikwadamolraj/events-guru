import {
  Controller,
  HttpException,
  Inject,
  OnModuleInit,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { catchError, Observable } from 'rxjs';
import { AuthGuard } from 'src/auth/auth.guard';

import {
  CreateOrderRequest,
  CreateOrderResponse,
  OrderServiceClient,
  ORDER_SERVICE_NAME,
} from './order.pb';
import { Request } from 'express';

export interface ICreateOrderRequest extends Request {
  user: number;
}

@Controller('order')
export class OrderController implements OnModuleInit {
  private orderSvc: OrderServiceClient;

  @Inject(ORDER_SERVICE_NAME)
  private readonly orderClient: ClientGrpc;

  public onModuleInit(): void {
    this.orderSvc =
      this.orderClient.getService<OrderServiceClient>(ORDER_SERVICE_NAME);
  }

  @Post()
  @UseGuards(AuthGuard)
  private async createOrder(
    @Req() req: ICreateOrderRequest,
  ): Promise<Observable<CreateOrderResponse>> {
    const body: CreateOrderRequest = req.body;
    body.userId = req.user;
    const res = this.orderSvc.createOrder(body).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
    return res;
  }
}
