import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PriceList } from "./price-list.entity";
import { Repository } from "typeorm";
import { VehicleModel } from "../vehicle-model/vehicle-model.entity";
import { VehicleYear } from "../vehicle-year/vehicle-year.entity";
import { CreatePriceListDto, QueryPriceListDto } from "./dto";

@Injectable()
export class PriceListService {

  constructor(
    @InjectRepository(PriceList) private readonly priceListRepository: Repository<PriceList>,
    @InjectRepository(VehicleModel) private readonly vehicleModelRepository: Repository<VehicleModel>,
    @InjectRepository(VehicleYear) private readonly vehicleYearRepository: Repository<VehicleYear>
  ) {
  }


  async findAll(dto: QueryPriceListDto) {
    const model = new VehicleModel();
    model.id = dto.model_id;

    const year = new VehicleYear();
    year.id = dto.year_id;

    const [data, length] = await this.priceListRepository.findAndCount({
      where: {
        vehicleModel: dto.model_id ? model : undefined,
        vehicleYear: dto.year_id ? year : undefined,
        code: dto.code ? dto.code : undefined,
        price: dto.q ? parseInt(dto.q) : undefined
      },
      relations: {
        vehicleModel: true,
        vehicleYear: true
      },
      take: dto.limit,
      skip: (dto.page - 1) * dto.limit
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
    const data = await this.priceListRepository.findOne({
      where: {
        id
      },
      relations: {
        vehicleModel: true,
        vehicleYear: true
      }
    });

    if (!data) {
      throw new HttpException("Price list not found", 404);
    }
    return data;
  }


  async create(dto: CreatePriceListDto) {
    const model = await this.vehicleModelRepository.findOneBy({
      id: dto.model_id
    });

    if (!model) {
      throw new HttpException("Vehicle model not found", 404);
    }

    const year = await this.vehicleYearRepository.findOneBy({
      id: dto.year_id
    });

    if (!year) {
      throw new HttpException("Vehicle year not found", 404);
    }

    return await this.priceListRepository.save({
      price: dto.price,
      code: this.genCode(),
      vehicleModel: model,
      vehicleYear: year
    });
  }


  async update(id: number, dto: CreatePriceListDto) {
    const model = await this.vehicleModelRepository.findOneBy({
      id: dto.model_id
    });

    if (!model) {
      throw new HttpException("Vehicle model not found", 404);
    }

    const year = await this.vehicleYearRepository.findOneBy({
      id: dto.year_id
    });

    if (!year) {
      throw new HttpException("Vehicle year not found", 404);
    }

    await this.priceListRepository.update(id, {
      price: dto.price,
      code: this.genCode(),
      vehicleModel: model,
      vehicleYear: year
    });

    return { msg: "ok" };
  }


  async remove(id: number) {
    await this.priceListRepository.delete(id);
    return { msg: "ok" };
  }

  genCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

}
