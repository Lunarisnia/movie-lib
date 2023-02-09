export default /* GraphQL */ `
  """
  Interface representing Movie data.
  """
  interface IMovie {
    id: ID!
    title: String
    slug: String
    durationInMinutes: Int
    posterImageUrl: String
    releaseDate: Date
    synopsis: String
    rating: Float
  }

  """
  Type representing Movie data.
  """
  type Movie implements IMovie {
    id: ID!
    title: String
    slug: String
    durationInMinutes: Int
    posterImageUrl: String
    releaseDate: Date
    synopsis: String
    rating: Float
    genres: [Genre]
    ageRating: AgeRating
    actors: [Actor]
    authors: [Author]
  }

  """
  Abstract Input type for inputting id.
  """
  input InputID {
    id: ID!
  }

  """
  Input type for adding new movie entry
  """
  input AddMovieInput {
    title: String!
    durationInMinutes: Int!
    posterImageUrl: String!
    releaseDate: Date!
    synopsis: String!
    rating: Float
    genres: [InputID!]!
    ageRating: InputID!
    actors: [InputID!]!
    authors: [InputID!]!
  }

  """
  Input type for updating a movie entry
  """
  input UpdateMovieInput {
    title: String
    rating: Float
    durationInMinutes: Int
    posterImageUrl: String
    synopsis: String
    releaseDate: Date
    ageRating: InputID
  }

  type Query {
    """
    Fetch one movie entry by id.
    """
    movie(id: ID!): Movie
    """
    Fetch all movies entry.
    """
    movies: [Movie]
  }
  type Mutation {
    """
    Add a new movie entry.
    """
    addMovie(params: AddMovieInput): Movie
    """
    Update a movie entry.
    """
    updateMovie(id: ID!, update: UpdateMovieInput!): Movie
    """
    Delete a movie entry.
    """
    deleteMovie(id: ID!): String
    """
    Add an actor to a movie entry.
    """
    addActorToMovie(movieId: ID!, actorId: ID!): Movie
    """
    Remove an actor from a movie entry.
    """
    removeActorFromMovie(movieId: ID!, actorId: ID!): String
    """
    Add an author to a movie entry.
    """
    addAuthorToMovie(movieId: ID!, authorId: ID!): Movie
    """
    Remove an author from a movie entry.
    """
    removeAuthorFromMovie(movieId: ID!, authorId: ID!): String
  }
`;
