import React, { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.trailerVideo);
  const getMovieVideos = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/" +
          movieId +
          "/videos?language=en-US",
        API_OPTIONS
      );
      const json = await data.json();
      const trailer =
        json.results.find((video) => video.type === "Trailer") ||
        json.results?.[0];
      dispatch(addTrailerVideo(trailer));
    } catch (e) {
      console.error("TMDB API is down");
    }
  };
  useEffect(() => {
    !trailerVideo && getMovieVideos();
  }, []);
};

export default useMovieTrailer;
