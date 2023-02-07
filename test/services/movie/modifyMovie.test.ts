import modifyMovie from "../../../src/services/movie/modifyMovie";

import Actor from "../../../src/db/models/actor.model";
import AgeRating from "../../../src/db/models/ageRating.model";
import Author from "../../../src/db/models/author.model";
import Genre from "../../../src/db/models/genre.model";
import Movie from "../../../src/db/models/movie.model";
import MovieActor from "../../../src/db/models/movieActor.model";
import MovieAuthor from "../../../src/db/models/movieAuthor.model";
import MovieGenre from "../../../src/db/models/movieGenre.model";
import dayjs from "dayjs";
import slugify from "../../../src/services/utils/slugify";

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

describe("Given a function that can modify movie entry", () => {
  const mockMovie = {
    id: "1",
    title: "The Matrix",
    ageRatingId: 1,
    slug: "slugs",
    durationInMinutes: 180,
    posterImageUrl: "https://flxt.tmsimg.com/assets/p22804_p_v8_av.jpg",
    synopsis: "Lorem Ipsum yada yada",
    releaseDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const mockReturn = "Foo";
  it("Modified the entry successfully", async () => {
    AgeRating.findByPk = jest.fn().mockReturnValue({ id: "1" });
    Movie.update = jest.fn().mockReturnValue([1]);
    Movie.findByPk = jest.fn().mockReturnValue({
      ...mockMovie,
      title: mockReturn,
    });
    const modified = await modifyMovie("1", {
      title: mockReturn,
    });

    expect(modified?.title).toEqual("Foo");
  });
  it("Modified the entry successfully without slug but with age rating", async () => {
    AgeRating.findByPk = jest.fn().mockReturnValue({ id: "1" });
    Movie.update = jest.fn().mockReturnValue([1]);
    Movie.findByPk = jest.fn().mockReturnValue({
      ...mockMovie,
      ageRatingId: "2",
    });
    const modified = await modifyMovie("1", {
      ageRating: {
        id: "2",
      },
    });

    expect(modified?.ageRatingId).toEqual("2");
  });
  it("Throws InternalError when nothing is updated.", async () => {
    AgeRating.findByPk = jest.fn().mockReturnValue({ id: "1" });
    Movie.update = jest.fn().mockReturnValue([0]);
    Movie.findByPk = jest.fn().mockReturnValue({
      ...mockMovie,
      ageRatingId: "2",
    });
    try {
      await modifyMovie("1", {
        ageRating: {
          id: "2",
        },
      });
    } catch (error: any) {
      expect(error.name).toEqual("InternalError");
    }
  });
});
