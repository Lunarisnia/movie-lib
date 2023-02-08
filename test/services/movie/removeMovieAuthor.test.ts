import removeMovieAuthor from "../../../src/services/movie/removeMovieAuthor";

import MovieAuthor from "../../../src/db/models/movieAuthor.model";

beforeEach(() => {
  jest.resetAllMocks();
  jest.mock("../../../src/db/models/movieAuthor.model");
});

describe("Given a fucntion that can delete a data", () => {
  it("Delete a data successfully", async () => {
    MovieAuthor.destroy = jest.fn().mockReturnValue(1);
    const result = await removeMovieAuthor("1", "2");
    
    expect(result).toEqual("Success. Amount of data affected: 1")
  });
});
