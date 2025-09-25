import React, { useState, useEffect } from 'react';

// Mock data - replace with real API calls
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
    Runtime: "136 min"
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
    Runtime: "148 min"
  }
];

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const searchMovies = async (term) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const filtered = mockMovies.filter(movie =>
        movie.Title.toLowerCase().includes(term.toLowerCase())
      );
      setMovies(filtered);
      setIsLoading(false);
    }, 1000);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      searchMovies(searchTerm);
    }
  };

  useEffect(() => {
    searchMovies('matrix');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <i className="fas fa-film mr-3"></i>Movie Database
          </h1>
          <p className="text-gray-300 text-lg">Discover your favorite movies</p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for movies..."
              className="flex-1 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              <i className="fas fa-search mr-2"></i>Search
            </button>
          </div>
        </form>

        {/* Loading */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="loading-spinner w-12 h-12 mx-auto mb-4"></div>
            <p className="text-gray-300">Searching movies...</p>
          </div>
        )}

        {/* Movies Grid */}
        {!isLoading && movies.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map(movie => (
              <div key={movie.imdbID} className="movie-card rounded-lg p-4">
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <h3 className="text-white text-xl font-semibold mb-2">{movie.Title}</h3>
                <p className="text-gray-300 mb-1">{movie.Year} • {movie.Runtime}</p>
                <p className="text-gray-400 text-sm">{movie.Genre}</p>
                <div className="mt-3 flex