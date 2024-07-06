import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { VehicleYear } from "../vehicle-year/vehicle-year.entity";
import { VehicleModel } from "../vehicle-model/vehicle-model.entity";

@Entity("price_list")
export class PriceList {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  price: number;

  @ManyToOne(() => VehicleYear, (vehicleYear) => vehicleYear.priceList)
  @JoinColumn({ name: "year_id" })
  vehicleYear: VehicleYear;

  @ManyToOne(() => VehicleModel, (vehicleModel) => vehicleModel.priceList)
  @JoinColumn({ name: "model_id" })
  vehicleModel: VehicleModel;

  @Column({ name: "created_at", default: () => "now()" })
  createdAt: Date;

  @Column({ name: "updated_at", default: () => "now()" })
  updatedAt: Date;
}