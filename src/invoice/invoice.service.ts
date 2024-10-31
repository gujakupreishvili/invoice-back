import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Invoice } from './schema/invoice.schema';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel(Invoice.name)private invoiceModel: Model<Invoice>,
     private UserService: UsersService
    ){}

   
  async create(createInvoiceDto: CreateInvoiceDto, user: string) {
    console.log(user)
    const newPost= await this.invoiceModel.create({...createInvoiceDto, user});
    console.log(user)
    await this.UserService.addPost(user, newPost._id)
    return newPost
  }

  findAll() {
    return this.invoiceModel.find();
  }

  findOne(id) {
    return this.invoiceModel.findById(id).populate("user");
  }

  async update(id, updateInvoiceDto: UpdateInvoiceDto) {
    const invoice = await this.invoiceModel.findById(id)
    if(!invoice) throw new NotFoundException
    const  updateInvoice = await this.invoiceModel.findByIdAndUpdate(id, updateInvoiceDto,{new: true})
    return updateInvoice;
  }

   async remove(id) {
    const invoice = await this.invoiceModel.findById(id)
    if(!invoice) throw new NotFoundException
    const deleteInvoice = await this.invoiceModel.findByIdAndDelete(id)
    return deleteInvoice;
  }
}
