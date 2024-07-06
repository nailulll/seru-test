import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateVehicleYearDto {
  @IsNotEmpty()
  @IsNumber()
  year: number;
}