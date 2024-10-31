import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { CreatUserDto } from './DTOs/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User> ){}

  findAll(){
    return this.userModel.find()
  }
  creat(creatUserDto: CreatUserDto){
    return this.userModel.create(creatUserDto)
  }
  getById(id){
    return this.userModel.findById(id).populate("Invoice")
  }
  findOne(query){
    return this.userModel.findOne(query)
  }
  findByEmail(query){
    return this.userModel.findOne(query).select("+password")
  }
  async addPost(userId, postId){
    const user = await this.userModel.findById(userId)
    if (!user) throw new  NotFoundException
    user.Invoice.push(postId)
    const updateUser = await this.userModel.findByIdAndUpdate(userId, user,{new: true})
    return updateUser
  }
}
