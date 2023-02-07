import {
  Model,
  Table,
  Column,
  BelongsToMany,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import Gender from "./gender.model";
import Movie from "./movie.model";
import MovieAuthor from "./movieAuthor.model";

@Table({
  tableName: "authors",
  paranoid: true,
})
export default class Author extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column
  name!: string;

  @ForeignKey(() => Gender)
  @Column
  genderId!: number;

  @Column
  photoUrl!: string;

  @BelongsTo(() => Gender)
  gender!: Gender;

  @BelongsToMany(() => Movie, () => MovieAuthor)
  movies!: Array<Movie & { MovieAuthor: MovieAuthor }>;
}
