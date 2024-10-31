import { Invoice } from './../../invoice/entities/invoice.entity';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class User{
  @Prop()
  name: string;
  @Prop({unique: true})
  email: string;
  @Prop({select: false})
  password: string;
  @Prop([{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invoice'
  }])
  Invoice: mongoose.Schema.Types.ObjectId[]
}
export const UserSchema = SchemaFactory.createForClass(User)