import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/GPTSlice";
import { Popover } from "../utilComponents/Popover";

const GPTSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const searchMovieTMDB = async (movieName) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movieName +
        "&include_adult=false&include_video=false&language=en-US",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGPTSearchClick = async () => {
    const gptQuery =
      "Act as a Movie recommendation system and suggest some movies for the query: " +
      searchText.current.value +
      ". Only give me names of 5 movies, comma separated like the example result given ahead. Example result: Gadar, Sholay, Don, Jawaan, Kabhi Khushi Kabhi Gam";
    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    if (!gptResults.choices) return; //show a message below
    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);
    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  const popoverContent = (
    <div>
      Please generate or get your key here:{" "}
      <a
        href="https://platform.openai.com/account/api-keys"
        target="_blank"
        rel="noopener noreferrer"
      >
        platform.openai.com/api-keys
      </a>
    </div>
  );
  return (
    <div className="ptF-[40%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-16"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}
        ></input>
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
          onClick={handleGPTSearchClick}
        >
          {lang[langKey].search}
        </button>
        <div className="col-span-4 flex flex-col justify-center m-4">
          <div className="text-white flex gap-1 items-center">
            <div>Enter your API Key</div>
            <Popover content={popoverContent}>
              <div className="cursor-pointer text-lg">ⓘ</div>
            </Popover>
          </div>
          <input
            ref={searchText}
            type="text"
            className="p-2 mt-2 h-2/5 w-full"
            placeholder={lang[langKey].apiKeyPlaceholder}
          ></input>
        </div>
      </form>
    </div>
  );
};

export default GPTSearchBar;
