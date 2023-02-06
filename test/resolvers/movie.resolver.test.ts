import { createYoga } from "graphql-yoga";
import { buildHTTPExecutor } from "@graphql-tools/executor-http";
import { parse } from "graphql/language";
import slugify from "../../src/services/utils/slugify";
import { schema } from '../../src/gql/schema';

import Movie from "../../src/db/models/movie.model";

beforeEach(() => {
  jest.resetAllMocks();
  jest.mock("../../src/db/models/movie.model");
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

describe("Given a query that can return a list of movies", () => {
  it("Returns a list of every movies", async () => {
    Movie.findAll = jest
      .fn()
      .mockReturnValue([mockMovie, mockMovie, mockMovie]);
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

    expect(Movie.findAll).toBeCalledTimes(1);
    expect(movies).toHaveProperty("data.movies[0].title", "The Matrix");
    expect(movies).toHaveProperty("data.movies[0].ageRating.abbreviation", "G");
    expect(movies).toHaveProperty("data.movies[0].genres[0].name", "Action");
  });
});
