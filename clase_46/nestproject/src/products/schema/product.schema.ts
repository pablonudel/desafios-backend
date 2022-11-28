import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import mongoose, {HydratedDocument} from 'mongoose'

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product{
    @Prop({required:true})
    name:string;
    @Prop({required:true, unique:true})
    code:String;
    @Prop()
    description:string;
    @Prop({required:true})
    image:string;
    @Prop({required:true})
    price:number;
    @Prop({required:true, default:1})
    stock:number;
}

export const ProductSchema = SchemaFactory.createForClass(Product)