import Author from "../../../src/db/models/author.model";

import removeAuthor from "../../../src/services/author/removeAuthor";

beforeEach(() => {
  jest.resetAllMocks();
  jest.mock("../../../src/db/models/author.model");
});

describe("Given a function that remove an Author entry", () => {
  it("Deleted an entry successully", async () => {
    Author.destroy = jest.fn().mockReturnValue(1);
    const affectedCount = await removeAuthor("100");

    expect(affectedCount).toEqual(`Success. Amount of data affected: 1`);
  });
});
