import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import Genre from "./genre.model";
import Movie from "./movie.model";

@Table({
  tableName: "movieGenres",
})
export default class MovieGenre extends Model {
  @ForeignKey(() => Movie)
  @Column
  movieId!: number;

  @ForeignKey(() => Genre)
  @Column
  genreId!: number;
}
