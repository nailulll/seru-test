import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { VehicleBrand } from "./vehicle-brand.entity";
import { Repository } from "typeorm";
import { CreateVehicleBrandDto, QueryVehicleBrandDto, UpdateVehicleBrandDto } from "./dto";

@Injectable()
export class VehicleBrandService {
  constructor(@InjectRepository(VehicleBrand) private readonly vehicleBrandRepository: Repository<VehicleBrand>) {
  }

  async findAll(dto: QueryVehicleBrandDto) {
    const [data, length] = await this.vehicleBrandRepository.findAndCount({
      order: {
        name: "ASC"
      },
      take: dto.limit,
      skip: (dto.page - 1) * dto.limit,
      where: {
        name: dto.q ? `${dto.q}` : undefined
      }
    });

    const totalPage = Math.ceil(length / dto.limit)

    return {
      total: length,
      totalPage,
      currentPage: dto.page,
      currentTotal: data.length,
      data
    };
  }

  async findOne(id: number) {
    const data = await this.vehicleBrandRepository.findBy({
      id
    });

    if (!data) {
      throw new HttpException("Data not found", 404);
    }

    return data;
  }

  async create(dto: CreateVehicleBrandDto) {
    const data = this.vehicleBrandRepository.create(dto);
    await this.vehicleBrandRepository.save(data);
    return data;
  }

  async update(id: number, dto: UpdateVehicleBrandDto) {
    await this.vehicleBrandRepository.update({ id }, dto);
    return { msg: "ok" };
  }

  async destroy(id: number) {
    await this.vehicleBrandRepository.delete({ id });
    return { msg: "ok" };
  }
}
