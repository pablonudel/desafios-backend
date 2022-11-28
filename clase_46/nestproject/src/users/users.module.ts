import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { CartsService } from '../carts/carts.service';
import { UsersController } from './users.controller';
import { CartsController } from '../carts/carts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/users.schema';
import { Cart, CartSchema } from '../carts/schema/cart.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name:User.name,
      schema:UserSchema
    },
    {
      name:Cart.name,
      schema:CartSchema
    }
  ])],
  controllers: [UsersController, CartsController],
  providers: [UsersService, CartsService]
})
export class UsersModule {}
 
