import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";

const GPTMovieSuggestions = () => {
  const gpt = useSelector((store) => store.gpt);
  const { movieResults, movieNames } = gpt;
  if (!movieNames) return <h1>Loading...</h1>;

  return (
    <div className="w-full flex justify-center">
      <div className="p-10 m-4 bg-black text-white bg-opacity-90 flex flex-wrap justify-center w-fit gap-10">
        {movieResults.map((movie) => (
          <div>
            <div className="text-lg md:text-3xl py-4 text-white">
              {movie.Title}
            </div>
            <MovieCard posterPath={movie.Poster} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GPTMovieSuggestions;
