import { IsNotEmpty, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { PaginationDto } from "../../../pagination/dto";

export class QueryVehicleTypeDto extends PaginationDto {
  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  brand_id: number;
}