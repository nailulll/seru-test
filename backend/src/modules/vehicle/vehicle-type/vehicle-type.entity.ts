import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { VehicleBrand } from "../vehicle-brand/vehicle-brand.entity";
import { VehicleModel } from "../vehicle-model/vehicle-model.entity";

@Entity("vehicle_type")
export class VehicleType {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => VehicleBrand, (vehicleBrand) => vehicleBrand.vehicleTypes)
  @JoinColumn({ name: "brand_id" })
  vehicleBrand: VehicleBrand;

  @OneToMany(() => VehicleModel, (vehicleModel) => vehicleModel.vehicleType)
  vehicleModels: VehicleModel[];

  @Column({ name: "created_at", default: () => "now()" })
  createdAt: Date;

  @Column({ name: "updated_at", default: () => "now()" })
  updatedAt: Date;
}