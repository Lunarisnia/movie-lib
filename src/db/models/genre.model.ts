import { Model, Table, Column, BelongsToMany } from "sequelize-typescript";
import Movie from "./movie.model";
import MovieGenre from "./movieGenre.model";

@Table({
  tableName: "genres",
  paranoid: true,
})
export default class Genre extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column
  name!: string;

  @BelongsToMany(() => Movie, () => MovieGenre)
  movies!: Array<Movie & { MovieGenre: MovieGenre }>;
}
