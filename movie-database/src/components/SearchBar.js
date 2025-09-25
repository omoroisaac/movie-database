import React, { useState } from 'react';

const SearchBar = ({ onSearch, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-lg border border-white/10">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a movie..."
          className="search-box flex-grow rounded-full px-6 py-4 bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="btn-search rounded-full px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold hover:from-red-600 hover:to-pink-700 transition-all duration-300 disabled:opacity-50"
        >
          {isLoading ? (
            <i className="fas fa-spinner fa-spin mr-2"></i>
          ) : (
            <i className="fas fa-search mr-2"></i>
          )}
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;