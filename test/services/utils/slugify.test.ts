import slugify from "../../../src/services/utils/slugify";

beforeEach(() => {
  jest.resetAllMocks();
});

describe("Given a function that returns a unique slug", () => {
  const mockInput = "Slugify Me!! Please/    ";
  it("Returns a slug without any illegal characters.", async () => {
    const slug = slugify(mockInput);

    expect((/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/).test(slug)).toBeTruthy()
  });

  it("Returns a unique slug even with the same input.", async () => {
    const slug1 = slugify(mockInput);
    const slug2 = slugify(mockInput);
    
    expect(slug1 !== slug2).toBeTruthy()
  });
});
