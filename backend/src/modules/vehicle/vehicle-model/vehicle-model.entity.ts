import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { VehicleType } from "../vehicle-type/vehicle-type.entity";
import { PriceList } from "../price-list/price-list.entity";

@Entity("vehicle_model")
export class VehicleModel {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => VehicleType, (vehicleType) => vehicleType.vehicleModels)
  @JoinColumn({ name: "type_id" })
  vehicleType: VehicleType;

  @OneToMany(() => PriceList, (priceList) => priceList.vehicleModel)
  priceList: PriceList[];

  @Column({ name: "created_at", default: () => "now()" })
  createdAt: Date;

  @Column({ name: "updated_at", default: () => "now()" })
  updatedAt: Date;
}