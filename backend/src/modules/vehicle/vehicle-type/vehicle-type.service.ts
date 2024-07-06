import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { VehicleType } from "./vehicle-type.entity";
import { Like, Repository } from "typeorm";
import { CreateVehicleTypeDto, QueryVehicleTypeDto, UpdateVehicleTypeDto } from "./dto";
import { VehicleBrand } from "../vehicle-brand/vehicle-brand.entity";

@Injectable()
export class VehicleTypeService {

  constructor(
    @InjectRepository(VehicleType) private readonly vehicleTypeRepository: Repository<VehicleType>,
    @InjectRepository(VehicleBrand) private readonly vehicleBrandRepository: Repository<VehicleBrand>
  ) {
  }

  async findAll(dto: QueryVehicleTypeDto) {
    const brand = new VehicleBrand();
    brand.id = dto.brand_id;

    const [data, length] = await this.vehicleTypeRepository.findAndCount({
      order: {
        name: "ASC"
      },
      take: dto.limit,
      skip: (dto.page - 1) * dto.limit,
      where: {
        name: dto.q ? Like(`%${dto.q}%`) : undefined,
        vehicleBrand: brand.id ? brand : undefined
      },
      relations: {
        vehicleBrand: true
      }
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
    const data = await this.vehicleTypeRepository.findOne({
      where: { id }, relations: {
        vehicleBrand: true
      }
    });

    if (!data) {
      throw new HttpException("Data not found", 404);
    }

    return data;
  }

  async create(dto: CreateVehicleTypeDto) {
    const vehicleBrand = await this.vehicleBrandRepository.findOneBy({ id: dto.brand_id });
    if (!vehicleBrand) {
      throw new HttpException("Vehicle brand not found", 404);
    }

    const data = this.vehicleTypeRepository.create(dto);
    data.vehicleBrand = vehicleBrand;
    return await this.vehicleTypeRepository.save(data);
  }

  async update(id: number, dto: UpdateVehicleTypeDto) {
    const vehicleBrand = await this.vehicleBrandRepository.findOneBy({ id: dto.brand_id });
    if (!vehicleBrand) {
      throw new HttpException("Vehicle brand not found", 404);
    }

    const data = {
      name: dto.name,
      vehicleBrand
    };

    await this.vehicleTypeRepository.update(id, data);
    return { msg: "ok" };
  }

  async destroy(id: number) {
    await this.vehicleTypeRepository.delete(id);
    return { msg: "ok" };
  }

}
