import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class BillForm {
  @IsNotEmpty()
  @IsString()
  streetAddress: string;
  city: string;
  @IsNotEmpty()
  @IsNumber()
  postCode: number;
  @IsNotEmpty()
  @IsString()
  country: string;
}

export class BillTo {
  @IsNotEmpty()
  @IsString()
  clientName: string;
  @IsNotEmpty()
  @IsString()
  clientEmail:string
  @IsNotEmpty()
  @IsString()
  streetAdress:string
  @IsNotEmpty()
  @IsString()
  city:string
  @IsNotEmpty()
  @IsNumber()
  postCode:number
  @IsNotEmpty()
  @IsString()
  country:string
  @IsNotEmpty()
  @IsString()
  invoiceDate:string
  @IsNotEmpty()
  @IsString()
  projectDescription:string
  @IsNotEmpty()
  @IsString()
  paymentDue: string
}

export class CreateInvoiceDto {
  @IsNotEmpty()
  billForm: BillForm;
  @IsNotEmpty()
  billTo: BillTo;
  @IsNotEmpty()
  @IsString()
  status: string
}
