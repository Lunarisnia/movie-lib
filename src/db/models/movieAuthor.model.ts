import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import Author from "./author.model";
import Movie from "./movie.model";

@Table({
  tableName: "movieAuthors",
})
export default class MovieAuthor extends Model {
  @ForeignKey(() => Movie)
  @Column
  movieId!: number;

  @ForeignKey(() => Author)
  @Column
  authorId!: number;
}
