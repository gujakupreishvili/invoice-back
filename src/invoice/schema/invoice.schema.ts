import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from 'mongoose';

@Schema({_id: false})
export class BillTo {
  @Prop()
  clientName: string;

  @Prop()
  clientEmail: string;

  @Prop()
  streetAddress: string;

  @Prop()
  city: string;

  @Prop()
  postCode: number;

  @Prop()
  country: string;

  @Prop()
  invoiceDate: string;

  @Prop()
  projectDescription: string;
  @Prop()
  paymentDue: string
}

@Schema({_id: false})
export class BillForm {
  @Prop()
  streetAddress: string;

  @Prop()
  city: string;

  @Prop()
  postCode: number;

  @Prop()
  country: string;
}

@Schema()
export class Invoice extends Document {
  @Prop({ type: BillForm })
  billForm: BillForm;
  @Prop({ type: BillTo })
  billTo: BillTo;
  @Prop()
  status: string
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
  )
  user: mongoose.Schema.Types.ObjectId
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
