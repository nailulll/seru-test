import { IsNotEmpty, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class PaginationDto {
  @IsNotEmpty()
  @Type(() => Number)
  limit: number;

  @IsNotEmpty()
  @Type(() => Number)
  page: number;

  @IsOptional()
  q: string;
}