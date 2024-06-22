import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addUpcomingMovies } from "../utils/movieSlice";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const upcomingMovies = useSelector((store) => store.upcomingMovies);
  const getUpcomingMovies = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?page=1",
        API_OPTIONS
      );
      const json = await data.json();
      dispatch(addUpcomingMovies(json.results));
    } catch (e) {
      console.error("TMDB API is down");
    }
  };

  useEffect(() => {
    !upcomingMovies && getUpcomingMovies();
  }, []);
};

export default useUpcomingMovies;
