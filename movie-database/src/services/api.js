// Mock API service - Replace with real OMDB API calls
const API_KEY = 'your_api_key_here'; // Get from https://www.omdbapi.com/apikey.aspx

// Mock data for demonstration
const mockMovies = [
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Type: "movie",
    Poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    Genre: "Action, Sci-Fi",
    Director: "Lana Wachowski, Lilly Wachowski",
    Actors: "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss",
    Plot: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    imdbRating: "8.7",
    Runtime: "136 min",
    Rated: "R",
    Released: "31 Mar 1999",
    BoxOffice: "$171,479,930",
    Ratings: [
      { Source: "Internet Movie Database", Value: "8.7/10" },
      { Source: "Rotten Tomatoes", Value: "88%" },
      { Source: "Metacritic", Value: "73/100" }
    ]
  },
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Type: "movie",
    Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    Genre: "Action, Adventure, Sci-Fi",
    Director: "Christopher Nolan",
    Actors: "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page",
    Plot: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    imdbRating: "8.8",
    Runtime: "148 min",
    Rated: "PG-13",
    Released: "16 Jul 2010",
    BoxOffice: "$292,576,195",
    Ratings: [
      { Source: "Internet Movie Database", Value: "8.8/10" },
      { Source: "Rotten Tomatoes", Value: "87%" },
      { Source: "Metacritic", Value: "74/100" }
    ]
  },
  // Add more mock movies as needed
];

export const searchMovies = async (searchTerm, page = 1) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Filter mock data based on search term
  const filteredMovies = mockMovies.filter(movie =>
    movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Simulate pagination
  const moviesPerPage = 8;
  const startIndex = (page - 1) * moviesPerPage;
  const paginatedMovies = filteredMovies.slice(startIndex, startIndex + moviesPerPage);
  
  return {
    Search: paginatedMovies,
    totalResults: filteredMovies.length.toString(),
    Response: "True"
  };
};

export const getMovieDetails = async (imdbID) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const movie = mockMovies.find(m => m.imdbID === imdbID);
  if (movie) {
    return movie;
  }
  
  throw new Error('Movie not found');
};

// Real API implementation (commented out for now)
/*
export const searchMovies = async (searchTerm, page = 1) => {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}&page=${page}`
  );
  return await response.json();
};

export const getMovieDetails = async (imdbID) => {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`
  );
  return await response.json();
};
*/