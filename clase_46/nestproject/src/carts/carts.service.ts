import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import {Cart, CartDocument} from './schema/cart.schema' 

@Injectable()
export class CartsService {

  constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>){}

  create(createCartDto: CreateCartDto) {
    return this.cartModel.create(createCartDto);
  }

  findAll() {
    return this.cartModel.find();
  }

  findOne(id: string) {
    return this.cartModel.findOne({_id:id});
  }

  update(id: string, updateCartDto: UpdateCartDto) {
    return this.cartModel.updateOne({_id:id}, {$set:updateCartDto})
  }

  remove(id: string) {
    return this.cartModel.deleteOne({_id:id});
  }
}
