import { Transform } from "class-transformer"
import { IsEmail, IsNotEmpty, IsString, Min, min, MinLength, } from "class-validator"

export class CreatUserDto{
  @IsNotEmpty()
  @IsString()
  name: string
  @IsEmail()
  @Transform(({value})=> value.toLowerCase())
  @IsNotEmpty()
  email: string
  @IsNotEmpty()
  @MinLength(4)
  password: string

}