import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum IsAdmin {
  TRUE = "TRUE",
  FALSE = "FALSE",
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: "is_admin", type: "enum", enum: IsAdmin, default: IsAdmin.FALSE })
  isAdmin: IsAdmin;

  @Column({ name: "created_at", default: () => "now()" })
  createdAt: Date;

  @Column({ name: "updated_at", default: () => "now()" })
  updatedAt: Date;
}


