import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import Actor from "./actor.model";
import Movie from "./movie.model";

@Table({
  tableName: "movieActors",
})
export default class MovieActor extends Model {
  @ForeignKey(() => Movie)
  @Column
  movieId!: number;

  @ForeignKey(() => Actor)
  @Column
  actorId!: number;
}
