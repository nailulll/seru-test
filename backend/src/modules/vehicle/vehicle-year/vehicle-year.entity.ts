import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PriceList } from "../price-list/price-list.entity";

@Entity("vehicle_year")
export class VehicleYear {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  year: number;

  @OneToMany(() => PriceList, (priceList) => priceList.vehicleYear)
  priceList: PriceList[];

  @Column({ name: "created_at", default: () => "now()" })
  createdAt: Date;

  @Column({ name: "updated_at", default: () => "now()" })
  updatedAt: Date;
}