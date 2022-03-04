import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { validate } from 'class-validator';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import {User} from './interfaces/user.interface';
import { Result } from './dtos/result.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel:Model<User>){}

    async findAll(): Promise<User[]>{
        return await this.userModel.find();
    }
    
    findById(id:string){
        return this.userModel.findById(id);
    }

    delete(id:string){
        return `delete user with id: ${id}`
    }

    update(){
        return 'update user';
    }

    create(createDto: CreateUserDto):void {
        debugger
        var newUser = new this.userModel(createDto);
        newUser.save();
     
    }
}
