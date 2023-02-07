import { createYoga } from "graphql-yoga";
import { buildHTTPExecutor } from "@graphql-tools/executor-http";
import { parse } from "graphql/language";
import slugify from "../../src/services/utils/slugify";
import { schema } from "../../src/gql/schema";

import Movie from "../../src/db/models/movie.model";
import Actor from "../../src/db/models/actor.model";
import AgeRating from "../../src/db/models/ageRating.model";
import Author from "../../src/db/models/author.model";
import Genre from "../../src/db/models/genre.model";
import MovieActor from "../../src/db/models/movieActor.model";
import MovieAuthor from "../../src/db/models/movieAuthor.model";
import MovieGenre from "../../src/db/models/movieGenre.model";

beforeEach(() => {
  jest.resetAllMocks();
  jest.mock("../../src/db/models/movie.model");
  jest.mock("../../src/db/models/actor.model");
  jest.mock("../../src/db/models/ageRating.model");
  jest.mock("../../src/db/models/author.model");
  jest.mock("../../src/db/models/gender.model");
  jest.mock("../../src/db/models/genre.model");
  jest.mock("../../src/db/models/movie.model");
  jest.mock("../../src/db/models/movieActor.model");
  jest.mock("../../src/db/models/movieAuthor.model");
  jest.mock("../../src/db/models/movieGenre.model");
});

const yoga = createYoga({ schema });

const executor = buildHTTPExecutor({
  fetch: yoga.fetch,
});

const mockMovie = {
  id: 1,
  title: "The Matrix",
  slug: slugify("The Matrix"),
  durationInMinutes: 180,
  posterImageUrl: "https://flxt.tmsimg.com/assets/p22804_p_v8_av.jpg",
  synopsis: "Lorem Ipsum yada yada",
  releaseDate: new Date(),
  ageRating: {
    name: "General Audiences",
    abbreviation: "G",
  },
  genres: [
    {
      name: "Action",
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("Given a query that can delete a movie", () => {
  it("Return the deletion result", async () => {
    Movie.destroy = jest.fn().mockReturnValue(1);
    const movie = await executor({
      document: parse(/* GraphQL */ `
        mutation MyDeletedMovie {
          deleteMovie(id: "1")
        }
      `),
    });

    expect(movie).toHaveProperty(
      "data.deleteMovie",
      "Success. Amount of data affected: 1"
    );
  });
  it("Handle the error", async () => {
    Movie.destroy = jest.fn().mockRejectedValue(new Error("Internal"));
    try {
      await executor({
        document: parse(/* GraphQL */ `
          mutation MyDeletedMovie {
            deleteMovie(id: "1")
          }
        `),
      });
    } catch (error: any) {
      expect(error.name).toEqual("GraphQLError");
    }
  });
});

describe("Given a query that can update a movie", () => {
  it("Update a movie", async () => {
    Movie.update = jest.fn().mockReturnValue([1]);
    Movie.findByPk = jest.fn().mockReturnValue({
      ...mockMovie,
      title: "The Foobar",
    });
    const movie = await executor({
      document: parse(/* GraphQL */ `
        mutation MyUpdatedMovie {
          updateMovie(id: "1", update: { title: "The Foobar" }) {
            id
            title
          }
        }
      `),
    });

    expect(movie).toHaveProperty("data.updateMovie.title", "The Foobar");
  });
  it("Throws an ", async () => {
    Movie.update = jest.fn().mockReturnValue([0]);
    Movie.findByPk = jest.fn().mockReturnValue({
      ...mockMovie,
      title: "The Foobar",
    });
    try {
      await executor({
        document: parse(/* GraphQL */ `
          mutation MyUpdatedMovie {
            updateMovie(id: "1", update: { title: "The Foobar" }) {
              id
              title
            }
          }
        `),
      });
    } catch (error: any) {
      expect(error.name).toEqual("GraphQLError");
    }
  });
});
describe("Given a query that can return a movie", () => {
  it("Return a movie", async () => {
    Movie.findByPk = jest.fn().mockReturnValue(mockMovie);
    const movie = await executor({
      document: parse(/* GraphQL */ `
        query MyMovie {
          movie(id: "1") {
            id
            title
          }
        }
      `),
    });

    expect(movie).toHaveProperty("data.movie.title", "The Matrix");
  });
});

describe("Given a query that can return a list of movies", () => {
  it("Returns a list of every movies", async () => {
    Movie.findAndCountAll = jest
      .fn()
      .mockReturnValue({ rows: [mockMovie, mockMovie, mockMovie], count: 3 });
    const movies = await executor({
      document: parse(/* GraphQL */ `
        query MyMovies {
          movies {
            id
            title
            slug
            durationInMinutes
            posterImageUrl
            synopsis
            ageRating {
              name
              abbreviation
            }
            genres {
              name
            }
          }
        }
      `),
    });

    expect(Movie.findAndCountAll).toBeCalledTimes(1);
    expect(movies).toHaveProperty("data.movies[0].title", "The Matrix");
    expect(movies).toHaveProperty("data.movies[0].ageRating.abbreviation", "G");
    expect(movies).toHaveProperty("data.movies[0].genres[0].name", "Action");
  });
  it("Create and return a new movie", async () => {
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
    Movie.create = jest
      .fn()
      .mockReturnValue({ id: "100", title: "The Mutrix" });
    MovieGenre.bulkCreate = jest.fn();
    MovieAuthor.bulkCreate = jest.fn();
    MovieActor.bulkCreate = jest.fn();
    Movie.findByPk = jest
      .fn()
      .mockReturnValue({ id: "100", title: "The Mutrix" });
    const newMovie = await executor({
      document: parse(/* GraphQL */ `
        mutation NewMovies {
          addMovie(
            params: {
              title: "NewMovie4"
              durationInMinutes: 120
              posterImageUrl: "url.com"
              releaseDate: "01-01-2024"
              synopsis: "foobar"
              genres: [{ id: "1" }]
              ageRating: { id: "1" }
              actors: [{ id: "1" }]
              authors: [{ id: "1" }]
            }
          ) {
            id
            title
          }
        }
      `),
    });

    expect(newMovie).toHaveProperty("data.addMovie.id", "100");
    expect(newMovie).toHaveProperty("data.addMovie.title", "The Mutrix");
  });
  it("Throws a GraphQLError", async () => {
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
    Movie.create = jest
      .fn()
      .mockReturnValue({ id: "100", title: "The Mutrix" });
    MovieGenre.bulkCreate = jest.fn();
    MovieAuthor.bulkCreate = jest.fn();
    MovieActor.bulkCreate = jest.fn();
    Movie.findByPk = jest
      .fn()
      .mockReturnValue({ id: "100", title: "The Mutrix" });
    try {
      await executor({
        document: parse(/* GraphQL */ `
          mutation NewMovies {
            addMovie(
              params: {
                title: "NewMovie4"
                durationInMinutes: 120
                posterImageUrl: "url.com"
                releaseDate: "01-01-2024"
                synopsis: "foobar"
                genres: [{ id: "1" }, { id: "2" }]
                ageRating: { id: "1" }
                actors: [{ id: "1" }]
                authors: [{ id: "1" }]
              }
            ) {
              id
              title
            }
          }
        `),
      });
    } catch (error: any) {
      expect(typeof error).toEqual("GraphQLError");
    }
  });
});
