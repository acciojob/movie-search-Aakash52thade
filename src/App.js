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
    <div>
      <h1>Movie Search</h1>

      <input
        type="text"
        placeholder="Search movie..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      {error && <p className="error">{error}</p>}

      <div>
        {movies.map((movie) => (
          <div key={movie.imdbID}>
            <h3>{movie.Title} ({movie.Year})</h3>
           
            {movie.Poster !== "N/A" && (
              <img src={movie.Poster} alt={movie.Title} width="150" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
