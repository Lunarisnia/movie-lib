import Actor from "../../../src/db/models/actor.model";

import removeActor from "../../../src/services/actor/removeActor";

beforeEach(() => {
  jest.resetAllMocks();
  jest.mock("../../../src/db/models/actor.model");
});

describe("Given a function that remove an Actor entry", () => {
  it("Deleted an entry successully", async () => {
    Actor.destroy = jest.fn().mockReturnValue(1);
    const affectedCount = await removeActor("100");

    expect(affectedCount).toEqual(`Success. Amount of data affected: 1`);
  });
});
