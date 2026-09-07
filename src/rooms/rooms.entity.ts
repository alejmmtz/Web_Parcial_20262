import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ScreeningEntity } from "../screenings/screenings.entity";

@Entity("rooms")
export class RoomEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column()
  capacity!: number;

  @OneToMany(() => ScreeningEntity, (screening) => screening.room)
  screenings = ScreeningEntity;
}
