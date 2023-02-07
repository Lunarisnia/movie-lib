import Actor from "../../../src/db/models/actor.model";
import fetchAllActors from "../../../src/services/actor/fetchAllActors";

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
    Actor.findAndCountAll = jest.fn().mockReturnValue({ rows: mockReturn, count: 1 });
    const actors = await fetchAllActors();
    expect(actors).toBeTruthy();
    expect(actors.rows[0].id).toEqual("1");
  });
});
