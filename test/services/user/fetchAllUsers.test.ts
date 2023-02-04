import fetchAllUsers from "../../../src/services/user/fetchAllUsers";

import User from "../../../src/db/models/user.model";

beforeEach(() => {
  jest.resetAllMocks();
});

describe("Given a function that return a list of every user", () => {
  it("Returns every user successfully.", async () => {
    User.findAll = jest.fn().mockReturnValue(["1", "2", "3"]);
    const users = await fetchAllUsers();

    expect(users).toHaveLength(3);
    expect(User.findAll).toBeCalled();
  });
});
