import { IsNotEmpty } from "class-validator";

export class CreateVehicleTypeDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  brand_id: number;
}