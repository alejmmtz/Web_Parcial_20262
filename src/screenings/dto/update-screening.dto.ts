export class UpdateScreeningDTO {
  movieTitle?: string;
  startsAt?: Date;
  status?: "scheduled" | "cancelled";
}
