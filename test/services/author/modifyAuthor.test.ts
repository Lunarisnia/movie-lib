import Author from "../../../src/db/models/author.model";
import Gender from "../../../src/db/models/gender.model";

import modifyAuthor from "../../../src/services/author/modifyAuthor";

beforeEach(() => {
  jest.resetAllMocks();
  jest.mock("../../../src/db/models/author.model");
});

describe("Given a function that can modify an author entry", () => {
  const mockAuthor = {
    id: "1",
    name: "Stephen King",
    genderId: "1",
    gender: {
      id: "1",
      name: "Male",
    },
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/e3/Stephen_King%2C_Comicon.jpg",
  };
  it("Successfully return the updated Author", async () => {
    Author.update = jest.fn().mockReturnValue([1]);
    Author.findByPk = jest.fn().mockReturnValue({ name: "Steph" });
    Gender.findByPk = jest.fn().mockReturnValue({ id: "1" });
    const modifiedAuthor = await modifyAuthor("1", {
      name: "Steph",
      gender: {
        id: "2",
      },
    });
    expect(modifiedAuthor?.name).toEqual("Steph");
  });
  it("Throws an error when nothing is updated", async () => {
    Author.update = jest.fn().mockReturnValue([0]);
    try {
      await modifyAuthor("1", {
        name: "Steph",
      });
    } catch (error: any) {
      expect(error.name).toEqual("InternalError");
    }
  });
});
