import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import MovieModal from './components/MovieModal';
import Pagination from './components/Pagination';
import { searchMovies, getMovieDetails } from './services/api';
import './index.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    // Load popular movies on initial render
    handleSearch('action');
  }, []);

  const handleSearch = async (term, page = 1) => {
    setIsLoading(true);
    setError('');
    setSearchTerm(term);
    setCurrentPage(page);

    try {
      const result = await searchMovies(term, page);
      
      if (result.Response === 'True') {
        setMovies(result.Search);
        setTotalResults(parseInt(result.totalResults));
        setTotalPages(Math.ceil(parseInt(result.totalResults) / 8));
      } else {
        setError(result.Error || 'No movies found');
        setMovies([]);
        setTotalPages(0);
      }
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMovieClick = async (imdbID) => {
    setIsLoading(true);
    try {
      const movieDetails = await getMovieDetails(imdbID);
      setSelectedMovie(movieDetails);
      setIsModalOpen(true);
    } catch (err) {
      setError('Failed to load movie details.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page) => {
    handleSearch(searchTerm, page);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div className="min-h-screen bg-gradient-dark p-4">
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
            <i className="fas fa-film mr-3"></i>Movie Database
          </h1>
          <p className="text-gray-300 text-lg">Discover information about your favorite movies</p>
        </div>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-center">
            <i className="fas fa-exclamation-circle mr-2"></i>
            {error}
          </div>
        )}

        {/* Results Info */}
        {movies.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white">Search Results</h2>
            <p className="text-gray-300">Found {totalResults} results for "{searchTerm}"</p>
          </div>
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="loading-spinner w-12 h-12 mx-auto mb-4"></div>
            <p className="text-gray-300">Searching for movies...</p>
          </div>
        )}

        {/* Movies Grid */}
        {!isLoading && movies.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  movie={movie}
                  onMovieClick={handleMovieClick}
                />
              ))}
            </div>
            
            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}

        {/* No Results */}
        {!isLoading && movies.length === 0 && !error && (
          <div className="text-center py-12">
            <i className="fas fa-film text-6xl text-gray-500 mb-4"></i>
            <p className="text-xl text-gray-400">No movies found. Try searching for something else.</p>
          </div>
        )}

        {/* Movie Details Modal */}
        <MovieModal
          movie={selectedMovie}
          isOpen={isModalOpen}
          onClose={closeModal}
        />

        {/* Footer */}
        <div className="text-center mt-12 text-gray-400 text-sm">
          <p>Powered by React & Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}

export default App;