import Genre from "../../../src/db/models/genre.model";
import fetchAllGenres from "../../../src/services/genre/fetchAllGenres";

beforeEach(() => {
  jest.resetAllMocks();
  jest.mock("../../../src/db/models/genre.model");
});

describe("Given a function that return a list of genres", () => {
  const mockGenre = {
    id: "1",
  };

  const mockReturn = [mockGenre, mockGenre];
  it("Returns the movie successfully", async () => {
    Genre.findAndCountAll = jest.fn().mockReturnValue({ rows: mockReturn, count: 1 });
    const genres = await fetchAllGenres();
    expect(genres).toBeTruthy();
    expect(genres.rows[0].id).toEqual("1");
  });
});
