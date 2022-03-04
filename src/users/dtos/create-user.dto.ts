// Check validate decorator in https://www.npmjs.com/package/class-validator#validation-decorators
 
import {
    validate,
    validateOrReject,
    Contains,
    IsInt,
    Length,
    IsEmail,
    IsDate,
    Min,
    Max,
    MinLength,
    MaxLength,
    IsNumberString
  } from 'class-validator';

export class CreateUserDto{
    public id?:string;
    public name:string;
    @MinLength(10, {
      message: 'Title is too short',
    })
    @MaxLength(50, {
      message: 'Title is too long',
    })
    public username:string;
    public password:string;
    
    @IsNumberString()
    public age:number;

}