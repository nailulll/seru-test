import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "../auth/guards";
import { IsAdminGuard } from "../auth/guards/is-admin.guard";
import { UpdateUserDto } from "./dto";
import { GetUserId } from "./decorators";
import { UserQueryDto } from "./dto/user-query.dto";

@UseGuards(AuthGuard)
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get("me")
  async me(@GetUserId() id: number) {
    return await this.userService.findOne(id);
  }

  @Get("")
  async findAll(@Query() dto: UserQueryDto) {
    return await this.userService.getAll(dto);
  }

  @Put(":id")
  @UseGuards(IsAdminGuard)
  async update(@Body() dto: UpdateUserDto, @Param() params: { id: number }) {
    return await this.userService.update(dto, params.id);
  }

  @Get(":id")
  async findOne(@Param() params: { id: number }) {
    return await this.userService.findOne(params.id);
  }

  @Delete(":id")
  @UseGuards(IsAdminGuard)
  async delete(@Param() params: { id: number }) {
    return await this.userService.destroy(params.id);
  }
}
