import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { VehicleModel } from "./vehicle-model.entity";
import { Like, Repository } from "typeorm";
import { CreateVehicleModelDto, QueryVehicleModelDto, UpdateVehicleModelDto } from "./dto";
import { VehicleType } from "../vehicle-type/vehicle-type.entity";

@Injectable()
export class VehicleModelService {
  constructor(
    @InjectRepository(VehicleModel) private readonly vehicleModelRepository: Repository<VehicleModel>,
    @InjectRepository(VehicleType) private readonly vehicleTypeRepository: Repository<VehicleType>
  ) {
  }

  async findAll(dto: QueryVehicleModelDto) {
    const type = new VehicleType();
    type.id = dto.type_id;

    const [data, length] = await this.vehicleModelRepository.findAndCount({
      where: {
        vehicleType: dto.type_id ? type : undefined,
        name: dto.q ? Like(`%${dto.q}%`) : undefined
      },
      take: dto.limit,
      skip: (dto.page - 1) * dto.limit,
      relations: { vehicleType: true, priceList: true }
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

  async findOne(id: number) {
    const data = await this.vehicleModelRepository.findOne({
      where: { id },
      relations: { vehicleType: true, priceList: true }
    });

    if (!data) {
      throw new HttpException("Vehicle model not found", 404);
    }

    return data;
  }

  async create(dto: CreateVehicleModelDto) {
    const vehicleType = await this.vehicleTypeRepository.findOneBy({ id: dto.type_id });

    if (!vehicleType) {
      throw new HttpException("Vehicle type not found", 404);
    }

    const data = {
      name: dto.name,
      vehicleType
    };

    return await this.vehicleModelRepository.save(data);

  }

  async update(id: number, dto: UpdateVehicleModelDto) {
    const vehicleType = await this.vehicleTypeRepository.findOneBy({ id: dto.type_id });

    if (!vehicleType) {
      throw new HttpException("Vehicle type not found", 404);
    }

    const data = {
      name: dto.name,
      vehicleType
    };

    await this.vehicleModelRepository.update({ id }, data);
    return { msg: "ok" };
  }


  async remove(id: number) {
    await this.vehicleModelRepository.delete({ id });
    return { msg: "ok" };
  }

}
