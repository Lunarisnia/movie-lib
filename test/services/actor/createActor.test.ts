import createActor from "../../../src/services/actor/createActor";

import Actor from "../../../src/db/models/actor.model";
import Gender from "../../../src/db/models/gender.model";

beforeEach(() => {
  jest.resetAllMocks();
  jest.mock("../../../src/db/models/actor.model");
  jest.mock("../../../src/db/models/gender.model");
});

describe("Given a function that can create a new Actor entry", () => {
  const mockActorInput = {
    name: "MockActor",
    gender: { id: "1" },
    photoUrl: "google.com",
  };
  it("Returns a new actor entry successfully", async () => {
    Gender.findByPk = jest.fn().mockReturnValue({ id: "1" });
    Actor.create = jest.fn().mockReturnValue({ id: "2" });
    Actor.findByPk = jest.fn().mockReturnValue({ id: "2" });

    const newAuthor = await createActor(mockActorInput);
    expect(newAuthor?.id).toEqual("2");
  });
  it("Throws an error when Gender ID is invalid", async () => {
    Gender.findByPk = jest.fn().mockReturnValue(null);
    Actor.create = jest.fn().mockReturnValue({ id: "2" });
    Actor.findByPk = jest.fn().mockReturnValue({ id: "2" });

    try {
      await createActor(mockActorInput);
    } catch (error: any) {
      expect(error.name).toEqual("ResourceNotFoundError");
    }
  });
});
