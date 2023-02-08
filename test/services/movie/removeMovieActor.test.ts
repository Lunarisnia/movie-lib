import removeMovieActor from "../../../src/services/movie/removeMovieActor";

import MovieActor from "../../../src/db/models/movieActor.model";

beforeEach(() => {
  jest.resetAllMocks();
  jest.mock("../../../src/db/models/movieActor.model");
});

describe("Given a fucntion that can delete a data", () => {
  it("Delete a data successfully", async () => {
    MovieActor.destroy = jest.fn().mockReturnValue(1);
    const result = await removeMovieActor("1", "2");
    
    expect(result).toEqual("Success. Amount of data affected: 1")
  });
});
