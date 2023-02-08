import createAuthor from "../../../src/services/author/createAuthor";

import Author from "../../../src/db/models/author.model";
import Gender from "../../../src/db/models/gender.model";

beforeEach(() => {
  jest.resetAllMocks();
  jest.mock("../../../src/db/models/author.model");
  jest.mock("../../../src/db/models/gender.model");
});

describe("Given a function that can create a new Author entry", () => {
  const mockAuthorInput = {
    name: "MockAuthor",
    gender: { id: "1" },
    photoUrl: "google.com",
  };
  it("Returns a new author entry successfully", async () => {
    Gender.findByPk = jest.fn().mockReturnValue({ id: "1" });
    Author.create = jest.fn().mockReturnValue({ id: "2" });
    Author.findByPk = jest.fn().mockReturnValue({ id: "2" });

    const newAuthor = await createAuthor(mockAuthorInput);
    expect(newAuthor?.id).toEqual("2");
  });
  it("Throws an error when Gender ID is invalid", async () => {
    Gender.findByPk = jest.fn().mockReturnValue(null);
    Author.create = jest.fn().mockReturnValue({ id: "2" });
    Author.findByPk = jest.fn().mockReturnValue({ id: "2" });

    try {
      await createAuthor(mockAuthorInput);
    } catch (error: any) {
      expect(error.name).toEqual("ResourceNotFoundError");
    }
  });
});
