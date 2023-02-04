import fetchAllUsers from '../../src/services/user/fetchAllUsers';

test("Output is User.findAll()", async () => {
    expect(await fetchAllUsers()).toBe("User.findAll()");
})