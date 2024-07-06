import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { VehicleType } from "../vehicle-type/vehicle-type.entity";

@Entity("vehicle_brand")
export class VehicleBrand {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => VehicleType, (vehicleType) => vehicleType.vehicleBrand)
  vehicleTypes: VehicleType[];

  @Column({ name: "created_at", default: () => "now()" })
  createdAt: Date;

  @Column({ name: "updated_at", default: () => "now()" })
  updatedAt: Date;
}