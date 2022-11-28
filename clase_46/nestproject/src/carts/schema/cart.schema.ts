import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import mongoose, {HydratedDocument} from 'mongoose'

export type CartDocument = HydratedDocument<Cart>;

@Schema()
export class CartProduct{
    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'Products'})
    _id:string;
    @Prop()
    name:string;
    @Prop()
    code:string;
    @Prop()
    image:string;
    @Prop()
    price:number;
    @Prop({default:1})
    qty:number;
    @Prop()
    subTotal:number;
}
export const CartProductSchema = SchemaFactory.createForClass(CartProduct)

@Schema()
export class Cart{
    @Prop({type:[CartProductSchema]})
    products:[]
}

export const CartSchema = SchemaFactory.createForClass(Cart)