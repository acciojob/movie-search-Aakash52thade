import React, { useState } from "react";
import axios from "axios";

const API_KEY = "99eb9fd1";

const App = () => {
  const [input, setInput] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = (e) => {
    if (e) e.preventDefault(); // Prevent form submission
    if (!input.trim()) return;
    
    axios
      .get(`https://www.omdbapi.com/?s=${input}&apikey=${API_KEY}`)  // FIXED: Changed backtick position
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
      <form onSubmit={handleSearch}> {/* FIXED: Added form tag */}
        <input
          type="text"
          placeholder="Search movie..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Search</button> {/* Added type="submit" */}
      </form>
      {error && <p className="error">{error}</p>}
      <ul> {/* FIXED: Changed to ul */}
        {movies.map((movie) => (
          <li key={movie.imdbID}> {/* FIXED: Changed to li */}
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
            {movie.Poster !== "N/A" && (
              <img src={movie.Poster} alt={movie.Title} width="150" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;