import fetchUser from "../../../src/services/user/fetchUser";

import User from "../../../src/db/models/user.model";

beforeEach(() => {
  jest.resetAllMocks();
  jest.mock("../../../src/db/models/user.model");
});

describe("Given an id of the user", () => {
  it("Returns the specified user.", async () => {
    const mockId = "1";
    User.findByPk = jest.fn().mockReturnValue({id: mockId});
    const user = await fetchUser(mockId);

    expect(user?.id).toEqual(mockId);
    expect(User.findByPk).toBeCalledTimes(1);
  });
});
