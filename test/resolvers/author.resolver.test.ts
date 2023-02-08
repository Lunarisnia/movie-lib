import { createYoga } from "graphql-yoga";
import { buildHTTPExecutor } from "@graphql-tools/executor-http";
import { parse } from "graphql/language";
import slugify from "../../src/services/utils/slugify";
import { schema } from "../../src/gql/schema";

import Movie from "../../src/db/models/movie.model";
import Author from "../../src/db/models/author.model";
import Actor from "../../src/db/models/actor.model";
import AgeRating from "../../src/db/models/ageRating.model";
import Genre from "../../src/db/models/genre.model";
import Gender from "../../src/db/models/gender.model";
import MovieActor from "../../src/db/models/movieActor.model";
import MovieAuthor from "../../src/db/models/movieAuthor.model";
import MovieGenre from "../../src/db/models/movieGenre.model";

beforeEach(() => {
  jest.resetAllMocks();
  jest.mock("../../src/db/models/movie.model");
  jest.mock("../../src/db/models/actor.model");
  jest.mock("../../src/db/models/ageRating.model");
  jest.mock("../../src/db/models/author.model");
  jest.mock("../../src/db/models/gender.model");
  jest.mock("../../src/db/models/genre.model");
  jest.mock("../../src/db/models/movie.model");
  jest.mock("../../src/db/models/movieActor.model");
  jest.mock("../../src/db/models/movieAuthor.model");
  jest.mock("../../src/db/models/movieGenre.model");
});

const yoga = createYoga({ schema });

const executor = buildHTTPExecutor({
  fetch: yoga.fetch,
});

const mockAuthor = {
  id: "1",
  name: "Keanu Reeves",
  gender: {
    id: "1",
    name: "Male",
  },
  photoUrl:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Keanu_Reeves_2013_%2810615146086%29_%28cropped%29.jpg/800px-Keanu_Reeves_2013_%2810615146086%29_%28cropped%29.jpg",
  movies: [
    {
      id: "1",
      title: "The Matrix",
      slug: slugify("The Matrix"),
      durationInMinutes: 180,
      posterImageUrl: "https://flxt.tmsimg.com/assets/p22804_p_v8_av.jpg",
      synopsis: "Lorem Ipsum yada yada",
      releaseDate: new Date(),
      ageRating: {
        name: "General Audiences",
        abbreviation: "G",
      },
      genres: [
        {
          name: "Action",
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
};

/**
 * Delete
 */
describe("Given a query that can delete a author entry", () => {
  it("Return the delete response", async () => {
    Author.destroy = jest.fn().mockReturnValue(1);
    const response = await executor({
      document: parse(/* GraphQL */ `
        mutation MyAuthor {
          deleteAuthor(id: "1")
        }
      `),
    });
    expect(response).toHaveProperty(
      "data.deleteAuthor",
      `Success. Amount of data affected: 1`
    );
  });
  it("Throw a GraphQLError", async () => {
    Author.destroy = jest.fn().mockRejectedValue(new Error("error"));
    try {
      await executor({
        document: parse(/* GraphQL */ `
          mutation MyAuthor {
            deleteAuthor(id: "1")
          }
        `),
      });
    } catch (error: any) {
      expect(error.name).toEqual("GraphQLError");
    }
  });
});

/**
 * Update
 */
describe("Given a query that can update a author entry", () => {
  it("Return the updated Entry", async () => {
    Gender.findByPk = jest.fn().mockReturnValue({ id: "1" });
    Author.update = jest.fn().mockReturnValue([1]);
    Author.findByPk = jest
      .fn()
      .mockReturnValue({ ...mockAuthor, name: "new name" });
    const author = await executor({
      document: parse(/* GraphQL */ `
        mutation MyActor {
          updateAuthor(
            id: "1"
            update: {
              name: "new name"
              gender: { id: "1" }
              photoUrl: "aaa.com"
            }
          ) {
            id
            name
            gender {
              name
            }
            movies {
              title
            }
          }
        }
      `),
    });
    expect(author).toHaveProperty("data.updateAuthor.name", "new name");
  });
  it("Throw a GraphQLError", async () => {
    Gender.findByPk = jest.fn().mockReturnValue({ id: "1" });
    Author.update = jest.fn().mockReturnValue([0]);
    try {
      await executor({
        document: parse(/* GraphQL */ `
          mutation MyActor {
            updateAuthor(
              id: "1"
              update: {
                name: "new name"
                gender: { id: "1" }
                photoUrl: "aaa.com"
              }
            ) {
              id
              name
              gender {
                name
              }
              movies {
                title
              }
            }
          }
        `),
      });
    } catch (error: any) {
      expect(error.name).toEqual("GraphQLError");
    }
  });
});

/**
 * Query
 */
describe("Given a query that can add a new author entry", () => {
  it("Return the new Entry", async () => {
    Gender.findByPk = jest.fn().mockReturnValue({ id: "1" });
    Author.create = jest.fn().mockReturnValue(mockAuthor);
    Author.findByPk = jest.fn().mockReturnValue(mockAuthor);
    const author = await executor({
      document: parse(/* GraphQL */ `
        mutation MyAuthor {
          addAuthor(
            params: {
              name: "Keanu Reeves"
              gender: { id: "1" }
              photoUrl: "aaa.com"
            }
          ) {
            id
            name
            gender {
              name
            }
            movies {
              title
            }
          }
        }
      `),
    });
    expect(author).toHaveProperty("data.addAuthor.name", "Keanu Reeves");
  });
  it("Throw a GraphQLError", async () => {
    Gender.findByPk = jest.fn().mockReturnValue({ id: "1" });
    Author.create = jest.fn().mockRejectedValue(new Error("Error"));
    try {
      await executor({
        document: parse(/* GraphQL */ `
          mutation MyAuthor {
            addAuthor(
              params: {
                name: "Keanu Reeves"
                gender: { id: "1" }
                photoUrl: "aaa.com"
              }
            ) {
              id
              name
              gender {
                name
              }
              movies {
                title
              }
            }
          }
        `),
      });
    } catch (error: any) {
      expect(error.name).toEqual("GraphQLError");
    }
  });
});

describe("Given a query that can return an author", () => {
  it("Return an author", async () => {
    Author.findByPk = jest.fn().mockReturnValue(mockAuthor);
    const author = await executor({
      document: parse(/* GraphQL */ `
        query MyAuthor {
          author(id: "1") {
            id
            name
            gender {
              name
            }
            movies {
              title
            }
          }
        }
      `),
    });
    expect(author).toHaveProperty("data.author.name", "Keanu Reeves");
  });
  it("Throws a GraphQLError", async () => {
    Author.findByPk = jest.fn().mockRejectedValue(new Error("Error"));
    try {
      await executor({
        document: parse(/* GraphQL */ `
          query MyAuthor {
            author(id: "1") {
              id
              name
              gender {
                name
              }
              movies {
                title
              }
            }
          }
        `),
      });
    } catch (error: any) {
      expect(error.name).toEqual("GraphQLError");
    }
  });
});

describe("Given a query that can return a list of authors", () => {
  it("Returns a list of every authors", async () => {
    Author.findAndCountAll = jest
      .fn()
      .mockReturnValue({ rows: [mockAuthor, mockAuthor, mockAuthor], count: 3 });
    const authors = await executor({
      document: parse(/* GraphQL */ `
        query MyAuthors {
          authors {
            id
            name
            gender {
              name
            }
            movies {
              title
            }
          }
        }
      `),
    });

    expect(authors).toHaveProperty("data.authors[0].name", "Keanu Reeves");
    expect(authors).toHaveProperty(
      "data.authors[0].movies[0].title",
      "The Matrix"
    );
  });
  it("Throws a graphql error", async () => {
    Author.findAndCountAll = jest.fn().mockRejectedValue(new Error("Error"));
    try {
      await executor({
        document: parse(/* GraphQL */ `
          query MyAuthors {
            authors {
              id
              name
              gender {
                name
              }
              movies {
                title
              }
            }
          }
        `),
      });
    } catch (error: any) {
      expect(error.name).toEqual("GraphQLError");
    }
  });
});
