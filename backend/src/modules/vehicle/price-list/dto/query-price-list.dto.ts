import { PaginationDto } from "../../../pagination/dto";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class QueryPriceListDto extends PaginationDto {
  @IsOptional()
  @IsNotEmpty()
  code: string;

  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  q: string;

  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  model_id: number;

  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  year_id: number;
}