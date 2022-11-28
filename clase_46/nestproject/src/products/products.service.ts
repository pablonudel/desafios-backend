import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schema/product.schema';

@Injectable()
export class ProductsService {

  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>){}

  create(createProductDto: CreateProductDto) {
    try {
      return this.productModel.create(createProductDto);
    } catch (error) {
      throw new Error(error)
    }
  }

  findAll() {
    return this.productModel.find();
  } 

  findOne(id: String) {
    return this.productModel.findOne({_id:id});
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productModel.updateOne({_id:id}, {$set:updateProductDto});
  } 

  remove(id: string) {
    return this.productModel.deleteOne({_id:id});
  }
}
