import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GPTMovieSuggestions = () => {
  const gpt = useSelector((store) => store.gpt);
  const { movieResults, movieNames } = gpt;
  if (!movieNames) return <h1>Loading...</h1>;

  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-90">
      <div>
        {movieNames.map((movieName, idx) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={movieResults[idx]}
          />
        ))}
      </div>
    </div>
  );
};

export default GPTMovieSuggestions;
