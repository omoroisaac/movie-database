import React from 'react';

const MovieCard = ({ movie, onMovieClick }) => {
  const handleClick = () => {
    onMovieClick(movie.imdbID);
  };

  return (
    <div
      className="movie-card p-4 rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-105"
      onClick={handleClick}
    >
      <div className="mb-4 relative overflow-hidden rounded-lg">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450/1a1a2e/ffffff?text=No+Image'}
          alt={movie.Title}
          className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x450/1a1a2e/ffffff?text=No+Image';
          }}
        />
      </div>
      <h3 className="font-semibold text-lg text-white truncate mb-1">{movie.Title}</h3>
      <p className="text-gray-400 text-sm mb-3">{movie.Year}</p>
      <div className="flex justify-between items-center">
        <span className="text-xs uppercase tracking-wide text-gray-400 bg-white/10 px-2 py-1 rounded">
          {movie.Type}
        </span>
        <button className="text-pink-500 hover:text-pink-400 text-sm font-medium transition-colors">
          Details <i className="fas fa-chevron-right ml-1"></i>
        </button>
      </div>
    </div>
  );
};

export default MovieCard;