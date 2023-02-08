import fetchAllMovies from "../../../src/services/movie/fetchAllMovies";

import Movie from "../../../src/db/models/movie.model";

beforeEach(() => {
  jest.resetAllMocks();
  jest.mock("../../../src/db/models/movie.model");
});

describe("Given a function that return a list of every movies", () => {
  const mockMovie = {
    id: 1,
    title: "The Matrix",
    ageRatingId: 1,
    slug: 'slugs',
    durationInMinutes: 180,
    posterImageUrl: "https://flxt.tmsimg.com/assets/p22804_p_v8_av.jpg",
    synopsis: "Lorem Ipsum yada yada",
    releaseDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  it("Returns every movies successfully.", async () => {
    const mockReturns = [mockMovie, mockMovie, mockMovie];
    Movie.findAndCountAll = jest.fn().mockReturnValue({rows: mockReturns, count: mockReturns.length});
    const movies = await fetchAllMovies({}, true);

    expect(movies.count).toEqual(3);
    expect(movies.rows[0].title).toEqual("The Matrix");
    expect(Movie.findAndCountAll).toBeCalled();
  });
});
