import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/users.schema'

@Injectable()
export class UsersService {
  
  constructor(@InjectModel(User.name) private usersModel: Model<UserDocument>){}
  
  create(createUser: CreateUserDto) {
    try {
      return this.usersModel.create(createUser)
    } catch (error) {
      throw new Error(error)
    }
  }

  findAll(limit=10) {
    return this.usersModel.find().limit(limit);
  }

  findOne(id: string) {
    return this.usersModel.findOne({_id:id})
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersModel.updateOne({_id:id}, {$set:updateUserDto})
  }

  remove(id: string) {
    return this.usersModel.deleteOne({_id:id})
  }
}
