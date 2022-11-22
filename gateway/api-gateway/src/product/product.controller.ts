import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  CreateProductRequest,
  CreateProductResponse,
  FindOneRequest,
  FindOneResponse,
  ProductServiceClient,
  PRODUCT_SERVICE_NAME,
} from './product.pb';

@Controller('product')
export class ProductController implements OnModuleInit {
  private productSvc: ProductServiceClient;

  @Inject(PRODUCT_SERVICE_NAME)
  private readonly productClient: ClientGrpc;

  public onModuleInit(): void {
    this.productSvc =
      this.productClient.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME);
  }

  @Post()
  @UseGuards(AuthGuard)
  private async createProduct(
    @Body() body: CreateProductRequest,
  ): Promise<Observable<CreateProductResponse>> {
    return this.productSvc.createProduct(body);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  private async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Observable<FindOneResponse>> {
    return this.productSvc.findOne({ id });
  }
}
