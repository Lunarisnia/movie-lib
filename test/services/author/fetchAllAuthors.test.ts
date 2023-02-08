import Actor from "../../../src/db/models/actor.model";
import AgeRating from "../../../src/db/models/ageRating.model";
import Author from "../../../src/db/models/author.model";
import Genre from "../../../src/db/models/genre.model";
import Movie from "../../../src/db/models/movie.model";
import MovieActor from "../../../src/db/models/movieActor.model";
import MovieAuthor from "../../../src/db/models/movieAuthor.model";
import MovieGenre from "../../../src/db/models/movieGenre.model";
import dayjs from "dayjs";
import Gender from "../../../src/db/models/gender.model";

import fetchAllAuthors from "../../../src/services/author/fetchAllAuthors";

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

describe("Given a function that can return a list of every authors", () => {
  const mockAuthor = {
    id: "1",
  };
  it("Returns a list of authors successfully", async () => {
    Author.findAndCountAll = jest
      .fn()
      .mockReturnValue({
        rows: [mockAuthor, mockAuthor, mockAuthor],
        count: 3,
      });
    const authors = await fetchAllAuthors();

    expect(authors.count).toEqual(3);
    expect(authors.rows[0].id).toEqual("1");
  });
});
