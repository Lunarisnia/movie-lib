import { getUsers } from "../../src/controllers/user.co";
import fetchAllUsers from "../../src/services/user/fetchAllUsers";
import { request, response } from "express";
import User from "../../src/db/models/user.model";
beforeEach(() => {
  jest.resetAllMocks();
  jest.mock("../../src/db/models/user.model");
  jest.mock("../../src/services/user/fetchAllUsers");
});

describe("Given a request that ask for every user", () => {
  it("Returns every user successfully.", async () => {
    const mockReturn = ["1", "2", "3"];
    User.findAll = jest.fn().mockReturnValue(mockReturn);
    response.send = jest.fn().mockReturnValue(mockReturn);
    const users = await getUsers(request, response);

    expect(users).toHaveLength(3);
  });
});
