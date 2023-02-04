import { getUsers } from "../../src/controllers/user.co";
import fetchAllUsers from "../../src/services/user/fetchAllUsers";
import { request, response } from "express";
beforeEach(() => {
  jest.resetAllMocks();
});

jest.mock("../../src/services/user/fetchAllUsers");

describe("Given a request that ask for every user", () => {
  it("Returns every user successfully.", async () => {
    response.send = jest.fn().mockReturnValue(["1", "2", "3"]);
    const users = await getUsers(request, response);

    expect(users).toHaveLength(3);
    expect(fetchAllUsers).toBeCalled();
  });
});
