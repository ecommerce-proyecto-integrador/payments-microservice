import  { IsString } from "class-validator"

export class CreatePayDto{
    @IsString()
    monto:number
    
}