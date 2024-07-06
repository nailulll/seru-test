import { IsNotEmpty, IsNumber } from "class-validator";

export class CreatePriceListDto {


  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  model_id: number;

  @IsNotEmpty()
  @IsNumber()
  year_id: number;

}