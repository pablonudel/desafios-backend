import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema} from './schema/cart.schema'

@Module({
  imports:[MongooseModule.forFeature([
    {
      name: Cart.name,
      schema: CartSchema
    }
  ])],
  controllers: [CartsController],
  providers: [CartsService]
})
export class CartsModule {}
