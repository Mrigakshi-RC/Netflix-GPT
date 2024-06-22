import { createSlice } from "@reduxjs/toolkit";
import {
  NOW_PLAYING_MOVIES,
  POPULAR_MOVIES,
  TOP_RATED_MOVIES,
  TRAILER_VIDEO,
  UPCOMING_MOVIES,
} from "../constants/initialMovieLists";
const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: NOW_PLAYING_MOVIES,
    popularMovies: POPULAR_MOVIES,
    topRatedMovies: TOP_RATED_MOVIES,
    upcomingMovies: UPCOMING_MOVIES,
    trailerVideo: TRAILER_VIDEO,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
  },
});
export const {
  addNowPlayingMovies,
  addPopularMovies,
  addUpcomingMovies,
  addTopRatedMovies,
  addTrailerVideo,
} = movieSlice.actions;
export default movieSlice.reducer;
