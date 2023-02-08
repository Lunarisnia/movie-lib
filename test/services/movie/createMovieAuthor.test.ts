import createMovieAuthor from "../../../src/services/movie/createMovieAuthor";
import MovieAuthor from "../../../src/db/models/movieAuthor.model";

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


describe("Given a function that can create a new MovieAuthor entry", () => {
  const mockAuthorInput = {
    movieId: "1",
    authorId: "2",
  };
  it("Returns a new movieAuthor entry successfully", async () => {
    MovieAuthor.findOne = jest.fn().mockReturnValue(null);
    MovieAuthor.create = jest.fn().mockReturnValue({ id: "2" });

    const newMovieActor = await createMovieAuthor(mockAuthorInput);
    expect(newMovieActor?.id).toEqual("2");
  });
  it("Returns a null if entry already exist", async () => {
    MovieAuthor.findOne = jest.fn().mockReturnValue({ id: "2" });
    MovieAuthor.create = jest.fn().mockReturnValue({ id: "2" });

    await createMovieAuthor(mockAuthorInput);
    expect(MovieAuthor.create).toBeCalledTimes(0);
  });
});
