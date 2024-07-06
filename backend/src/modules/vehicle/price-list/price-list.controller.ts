import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { PriceListService } from "./price-list.service";
import { AuthGuard } from "../../auth/guards";
import { CreatePriceListDto, QueryPriceListDto, UpdatePriceListDto } from "./dto";
import { IsAdminGuard } from "../../auth/guards/is-admin.guard";

@Controller("vehicle/price-list")
@UseGuards(AuthGuard)
export class PriceListController {

  constructor(private readonly priceListService: PriceListService) {
  }


  @Get("")
  findAll(@Query() dto: QueryPriceListDto) {
    return this.priceListService.findAll(dto);
  }

  @Get(":id")
  findOne(@Param() params: { id: number }) {
    return this.priceListService.findOne(params.id);
  }

  @Post("")
  @UseGuards(IsAdminGuard)
  create(@Body() dto: CreatePriceListDto) {
    return this.priceListService.create(dto);
  }

  @Put(":id")
  @UseGuards(IsAdminGuard)
  update(@Param() params: { id: number }, @Body() dto: UpdatePriceListDto) {
    return this.priceListService.update(params.id, dto);
  }

  @Delete(":id")
  @UseGuards(IsAdminGuard)
  remove(@Param() params: { id: number }) {
    return this.priceListService.remove(params.id);
  }

}
