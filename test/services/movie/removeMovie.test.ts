import removeMovie from "../../../src/services/movie/removeMovie";

import Movie from "../../../src/db/models/movie.model";

beforeEach(() => {
  jest.resetAllMocks();
  jest.mock("../../../src/db/models/movie.model");
});

describe("Given a fucntion that can delete a data", () => {
  it("Delete a data successfully", async () => {
    Movie.destroy = jest.fn().mockReturnValue(1);
    const result = await removeMovie("1");
    
    expect(result).toEqual("Success. Amount of data affected: 1")
  });
});
