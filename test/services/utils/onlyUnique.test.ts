import onlyUnique from "../../../src/services/utils/onlyUnique";

describe("Given a functions that will remove duplicate data from an array", () => {
  it("Returns only unique data", () => {
    const mockInput = ["1", "2", "3","1", "2", "3","1", "2", "3","1", "2", "3"];
    const unique = onlyUnique(mockInput);

    expect(unique).toHaveLength(3);
  });
});
