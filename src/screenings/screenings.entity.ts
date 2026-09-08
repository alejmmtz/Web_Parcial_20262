import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RoomEntity } from "../rooms/rooms.entity";

@Entity("screenings")
export class ScreeningEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "movie_title", nullable: false })
  movieTitle!: string;

  @Column({ name: "starts_at", nullable: false })
  startsAt!: Date;

  @Column({ default: "scheduled" })
  status!: "scheduled" | "cancelled";

  @ManyToOne(() => RoomEntity, (room) => room.screenings, {
    nullable: false,
  })
  @JoinColumn({ name: "room_id" })
  room!: RoomEntity;
}
