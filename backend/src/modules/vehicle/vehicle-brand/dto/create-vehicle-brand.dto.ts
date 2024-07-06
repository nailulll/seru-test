import { IsNotEmpty } from "class-validator";

export class CreateVehicleBrandDto {
  @IsNotEmpty()
  name: string;
}