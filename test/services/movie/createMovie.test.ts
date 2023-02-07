import createMovie from "../../../src/services/movie/createMovie";

import Actor from "../../../src/db/models/actor.model";
import AgeRating from "../../../src/db/models/ageRating.model";
import Author from "../../../src/db/models/author.model";
import Genre from "../../../src/db/models/genre.model";
import Movie from "../../../src/db/models/movie.model";
import MovieActor from "../../../src/db/models/movieActor.model";
import MovieAuthor from "../../../src/db/models/movieAuthor.model";
import MovieGenre from "../../../src/db/models/movieGenre.model";
import dayjs from "dayjs";

beforeEach(() => {
  jest.resetAllMocks();
  jest.mock("../../../src/db/models/actor.model");
  jest.mock("../../../src/db/models/ageRating.model");
  jest.mock("../../../src/db/models/author.model");
  jest.mock("../../../src/db/models/gender.model");
  jest.mock("../../../src/db/models/genre.model");
  jest.mock("../../../src/db/models/movie.model");
  jest.mock("../../../src/db/models/movieActor.model");
  jest.mock("../../../src/db/models/movieAuthor.model");
  jest.mock("../../../src/db/models/movieGenre.model");
});

describe("Given a function that create a new movie entry", () => {
  const mockNewMovieInput = {
    actors: [{ id: "1" }],
    ageRating: { id: "1" },
    authors: [{ id: "1" }],
    durationInMinutes: 190,
    genres: [{ id: "1" }],
    posterImageUrl: "https://google.com",
    rating: 4.0,
    releaseDate: dayjs("01-01-2029").format(),
    synopsis: "Synopsis here",
    title: "The Foobar",
  };
  it("Returns the newly created movie", async () => {
    Actor.findByPk = jest.fn().mockReturnValue({ id: "1" });
    AgeRating.findByPk = jest.fn().mockReturnValue({ id: "1" });
    Author.findByPk = jest.fn().mockReturnValue({ id: "1" });
    Genre.findAndCountAll = jest
      .fn()
      .mockReturnValue({ rows: [{ id: "1" }], count: 1 });
    Actor.findAndCountAll = jest
      .fn()
      .mockReturnValue({ rows: [{ id: "1" }], count: 1 });
    Author.findAndCountAll = jest
      .fn()
      .mockReturnValue({ rows: [{ id: "1" }], count: 1 });
    Movie.create = jest.fn().mockReturnValue({ id: "100" });
    MovieGenre.bulkCreate = jest.fn();
    MovieAuthor.bulkCreate = jest.fn();
    MovieActor.bulkCreate = jest.fn();
    Movie.findByPk = jest.fn().mockReturnValue({ id: "100" });
    const newMovie = await createMovie(mockNewMovieInput);

    expect(newMovie?.id).toEqual("100");
  });
  it("Throws an error when Age Rating ID is invalid", async () => {
    Actor.findByPk = jest.fn().mockReturnValue({ id: "1" });
    AgeRating.findByPk = jest.fn().mockReturnValue(null);
    Author.findByPk = jest.fn().mockReturnValue({ id: "1" });
    try {
      await createMovie({
        ...mockNewMovieInput,
        genres: [{ id: "1" }, { id: "2" }],
      });
    } catch (error: any) {
      expect(error.name).toEqual("ResourceNotFoundError");
    }
  });
  it("Throws an error when one or more Genre ID is invalid", async () => {
    Actor.findByPk = jest.fn().mockReturnValue({ id: "1" });
    AgeRating.findByPk = jest.fn().mockReturnValue({ id: "1" });
    Author.findByPk = jest.fn().mockReturnValue({ id: "1" });
    Genre.findAndCountAll = jest
      .fn()
      .mockReturnValue({ rows: [{ id: "1" }], count: 1 });
    try {
      await createMovie({
        ...mockNewMovieInput,
        genres: [{ id: "1" }, { id: "2" }],
      });
    } catch (error: any) {
      expect(error.name).toEqual("ResourceNotFoundError");
    }
  });
  it("Throws an error when one or more Actor ID is invalid", async () => {
    Actor.findByPk = jest.fn().mockReturnValue({ id: "1" });
    AgeRating.findByPk = jest.fn().mockReturnValue({ id: "1" });
    Author.findByPk = jest.fn().mockReturnValue({ id: "1" });
    Genre.findAndCountAll = jest
      .fn()
      .mockReturnValue({ rows: [{ id: "1" }], count: 1 });
    Actor.findAndCountAll = jest
      .fn()
      .mockReturnValue({ rows: [{ id: "1" }], count: 1 });
    try {
      await createMovie({
        ...mockNewMovieInput,
        actors: [{ id: "1" }, { id: "2" }],
      });
    } catch (error: any) {
      expect(error.name).toEqual("ResourceNotFoundError");
    }
  });
  it("Throws an error when one or more Author ID is invalid", async () => {
    Actor.findByPk = jest.fn().mockReturnValue({ id: "1" });
    AgeRating.findByPk = jest.fn().mockReturnValue({ id: "1" });
    Author.findByPk = jest.fn().mockReturnValue({ id: "1" });
    Genre.findAndCountAll = jest
      .fn()
      .mockReturnValue({ rows: [{ id: "1" }], count: 1 });
    Actor.findAndCountAll = jest
      .fn()
      .mockReturnValue({ rows: [{ id: "1" }], count: 1 });
    Author.findAndCountAll = jest
      .fn()
      .mockReturnValue({ rows: [{ id: "1" }], count: 1 });
    try {
      await createMovie({
        ...mockNewMovieInput,
        authors: [{ id: "1" }, { id: "2" }],
      });
    } catch (error: any) {
      expect(error.name).toEqual("ResourceNotFoundError");
    }
  });
});
