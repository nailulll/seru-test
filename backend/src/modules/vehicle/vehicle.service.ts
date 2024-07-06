import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { VehicleModel } from "./vehicle-model/vehicle-model.entity";
import { Like, Repository } from "typeorm";
import { QueryVehicleDto } from "./dto";
import { VehicleType } from "./vehicle-type/vehicle-type.entity";

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(VehicleModel) private readonly vehicleModelRepository: Repository<VehicleModel>,
  ) {
  }

  async findAll(dto: QueryVehicleDto) {
    const type = new VehicleType();
    type.id = dto.type_id;

    const [data, length] = await this.vehicleModelRepository.findAndCount({
      where: {
        vehicleType: dto.type_id ? type : undefined,
        name: dto.q ? Like(`%${dto.q}%`) : undefined
      },
      take: dto.limit,
      skip: (dto.page - 1) * dto.limit,
      relations: { vehicleType: true, priceList: { vehicleYear: true} }
    });

    const totalPage = Math.ceil(length / dto.limit);

    return {
      total: length,
      totalPage,
      currentPage: dto.page,
      currentTotal: data.length,
      data
    };
  }
}
