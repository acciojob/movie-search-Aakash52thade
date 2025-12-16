import React, { useState } from "react";
import axios from "axios";

const API_KEY = "99eb9fd1";

const App = () => {
  const [input, setInput] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (!input.trim()) return;
    
    axios
      .get(`https://www.omdbapi.com/?s=${input}&apikey=${API_KEY}`)
      .then((response) => {
        if (response.data.Response === "True") {
          setMovies(response.data.Search);
          setError("");
        } else {
          setMovies([]);
          setError("Invalid movie name. Please try again.");
        }
      })
      .catch(() => {
        setMovies([]);
        setError("Invalid movie name. Please try again.");
      });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Movie Search</h1>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search movie..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          className="flex-1 px-4 py-2 border border-gray-300 rounded"
        />
        <button 
          onClick={handleSearch}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>
      
      {error && <p className="error text-red-500 mb-4">{error}</p>}
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="border p-4 rounded shadow">
            {movie.Poster !== "N/A" && (
              <img 
                src={movie.Poster} 
                alt={movie.Title} 
                className="w-full mb-2 rounded"
              />
            )}
            <h3 className="font-semibold text-sm">{movie.Title}</h3>
            <p className="text-gray-600 text-sm">{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;