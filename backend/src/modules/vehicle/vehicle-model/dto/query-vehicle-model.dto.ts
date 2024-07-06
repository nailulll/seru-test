import { PaginationDto } from "../../../pagination/dto";
import { IsNotEmpty, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class QueryVehicleModelDto extends PaginationDto {
  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  type_id: number;
}