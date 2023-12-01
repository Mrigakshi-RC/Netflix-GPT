import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrendingMovies } from "../utils/movieSlice";

const useTrendingMovies = () => {
  const dispatch = useDispatch();
  const trendingMovies = useSelector((store) => store.trendingMovies);
  const getTrendingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/trending?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addTrendingMovies(json.results));
  };

  useEffect(() => {
    !trendingMovies && getTrendingMovies();
  }, []);
};

export default useTrendingMovies;
