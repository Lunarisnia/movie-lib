import fetchMovie from "../../../src/services/movie/fetchMovie";

import Movie from "../../../src/db/models/movie.model";

beforeEach(() => {
  jest.resetAllMocks();
  jest.mock("../../../src/db/models/movie.model");
});

describe("Given a function that return a movie", () => {
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
  const mockInput = "1";
  const mockReturn = mockMovie.id === mockInput ? mockMovie : null;
  it("Returns the movie successfully", async () => {
    Movie.findByPk = jest.fn().mockReturnValue(mockReturn);
    const movie = await fetchMovie(mockInput);
    expect(movie).toBeTruthy();
    expect(movie?.title).toEqual("The Matrix");
  });
});