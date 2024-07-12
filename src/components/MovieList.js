import React from "react";
import MovieCard from "./MovieCard";
import { IMG_CDN_URL } from "../utils/constants";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-6 bg-opacity-0">
      <h1 className="text-lg md:text-3xl py-4 text-white">{title}</h1>
      <div className="flex overflow-x-scroll scrollbar-hide">
        <div className="flex">
          {movies?.map((movie) => (
            <MovieCard
              key={movie.id}
              posterPath={IMG_CDN_URL + movie.poster_path}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
