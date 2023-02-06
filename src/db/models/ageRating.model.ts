import { Model, Table, Column, HasMany } from "sequelize-typescript";
import Movie from "./movie.model";

@Table({
  tableName: "ageRatings",
  paranoid: true,
})
export default class AgeRating extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column
  name!: string;

  @Column
  abbreviation!: string;

  @HasMany(() => Movie)
  movies!: Movie[];
}
