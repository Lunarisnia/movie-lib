export default /* GraphQL */ `
  type Movie {
    id: ID!
    title: String
    slug: String
    durationInMinutes: Int
    posterImageUrl: String
    releaseDate: Date
    synopsis: String
    genres: [Genre]
    ageRating: AgeRating
    actors: [Actor]
    authors: [Author]
  }

  input MoviesInput {
    ageRating: ID!
  }

  type Query {
    movies: [Movie]!
  }
`;
