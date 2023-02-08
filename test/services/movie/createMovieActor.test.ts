import createMovieActor from "../../../src/services/movie/createMovieActor";

import MovieActor from "../../../src/db/models/movieActor.model";

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

describe("Given a function that can create a new MovieActor entry", () => {
  const mockActorInput = {
    movieId: "1",
    actorId: "2",
  };
  it("Returns a new movieActor entry successfully", async () => {
    MovieActor.findOne = jest.fn().mockReturnValue(null);
    MovieActor.create = jest.fn().mockReturnValue({ id: "2" });

    const newMovieActor = await createMovieActor(mockActorInput);
    expect(newMovieActor?.id).toEqual("2");
  });
  it("Returns a null if entry already exist", async () => {
    MovieActor.findOne = jest.fn().mockReturnValue({ id: "2" });
    MovieActor.create = jest.fn().mockReturnValue({ id: "2" });

    await createMovieActor(mockActorInput);
    expect(MovieActor.create).toBeCalledTimes(0);
  });
});