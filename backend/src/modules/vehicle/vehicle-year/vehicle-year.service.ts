import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { VehicleYear } from "./vehicle-year.entity";
import { Repository } from "typeorm";
import { CreateVehicleYearDto, QueryVehicleYearDto, UpdateVehicleYearDto } from "./dto";

@Injectable()
export class VehicleYearService {
  constructor(@InjectRepository(VehicleYear) private readonly vehicleYearRepository: Repository<VehicleYear>) {
  }

  async findAll(dto: QueryVehicleYearDto) {
    const query = this.vehicleYearRepository.createQueryBuilder("vehicle_year");

    const vehicleYear = query.orderBy("id", "DESC")
      .take(dto.limit)
      .skip((dto.page - 1) * dto.limit);

    if (dto.q) {
      vehicleYear.where("vehicle_year.year = :q", { q: dto.q });
    }

    const data = await vehicleYear.getMany();
    const length = await vehicleYear.getCount();
    const totalPage = Math.ceil(length / dto.limit)

    return {
      total: length,
      totalPage,
      currentPage: dto.page,
      currentTotal: data.length,
      data
    };
  }

  async create(dto: CreateVehicleYearDto) {
    const vehicleYear = this.vehicleYearRepository.create(dto);
    await this.vehicleYearRepository.save(vehicleYear);
    return vehicleYear;
  }

  async findOne(id: number) {
    const data = await this.vehicleYearRepository.findOneBy({ id });

    if (!data) {
      throw new HttpException("Data not found", 404);
    }

    return data;

  }

  async update(dto: UpdateVehicleYearDto, id: number) {
    await this.vehicleYearRepository.update(id, dto);
    return { msg: "ok" };
  }

  async destroy(id: number) {
    await this.vehicleYearRepository.delete(id);
    return { msg: "ok" };
  }
}
