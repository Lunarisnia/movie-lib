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
import MovieActor from "./movieActor.model";
@Table({
  tableName: "actors",
  paranoid: true,
})
export default class Actor extends Model {
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

  @BelongsToMany(() => Movie, () => MovieActor)
  movies!: Array<Movie & { MovieActor: MovieActor }>;
}
