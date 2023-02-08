import Actor from "../../../src/db/models/actor.model";
import Gender from "../../../src/db/models/gender.model";

import modifyActor from "../../../src/services/actor/modifyActor";

beforeEach(() => {
  jest.resetAllMocks();
  jest.mock("../../../src/db/models/actor.model");
});

describe("Given a function that can modify an actor entry", () => {
  it("Successfully return the updated Actor", async () => {
    Actor.update = jest.fn().mockReturnValue([1]);
    Actor.findByPk = jest.fn().mockReturnValue({ name: "Steph" });
    Gender.findByPk = jest.fn().mockReturnValue({ id: "1" });
    const modifiedAuthor = await modifyActor("1", {
      name: "Steph",
      gender: {
        id: "2",
      },
    });
    expect(modifiedAuthor?.name).toEqual("Steph");
  });
  it("Throws an error when nothing is updated", async () => {
    Actor.update = jest.fn().mockReturnValue([0]);
    try {
      await modifyActor("1", {
        name: "Steph",
      });
    } catch (error: any) {
      expect(error.name).toEqual("InternalError");
    }
  });
});
