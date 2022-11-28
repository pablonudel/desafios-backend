import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import {Cart} from '../../carts/schema/cart.schema'

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User{
    @Prop({required: true})
    name:string;

    @Prop({required: true})
    lastname:string;

    @Prop({required: true, unique:true})
    email:string;
    
    @Prop({required: true})
    password:string;

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:Cart.name, required: true})
    cart:Cart;
}

export const UserSchema = SchemaFactory.createForClass(User)