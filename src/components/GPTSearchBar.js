import React, { useCallback, useRef, useState } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { useOpenAI } from "../hooks/useOpenAI";
import {
  API_OPTIONS,
  NO_RESULTS_MESSAGE,
  SET_KEY_ALERT_MESSAGE,
} from "../utils/constants";
import { addGptMovieResult } from "../utils/GPTSlice";
import { Popover } from "../utilComponents/Popover";
import { ToastMessage } from "../utilComponents/ToastMessage";

const GPTSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState({ show: false, message: "" });
  const [key, setKey] = useState(null);
  const openai = useOpenAI(key);

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
    if (!key) {
      setShowToast((prev) => ({
        ...prev,
        show: true,
        message: SET_KEY_ALERT_MESSAGE,
      }));
      return;
    }
    const gptQuery =
      "Act as a Movie recommendation system and suggest some movies for the query: " +
      searchText.current.value +
      ". Only give me names of 5 movies, comma separated like the example result given ahead. Example result: Gadar, Sholay, Don, Jawaan, Kabhi Khushi Kabhi Gam";

    try {
      const gptResults = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
      });

      if (!gptResults.choices) {
        setShowToast((prev) => ({
          ...prev,
          show: true,
          message: NO_RESULTS_MESSAGE,
        }));
        return;
      }
      const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);
      console.log(tmdbResults);
      dispatch(
        addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
      );
    } catch (e) {
      setShowToast((prev) => ({ ...prev, show: true, message: e.message }));
    }
  };

  const setShowToastCallback = useCallback((value) => {
    setShowToast((prev) => ({ ...prev, show: value }));
  }, []);

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
    <>
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
              value={key}
              type="text"
              className="p-2 mt-2 h-2/5 w-full"
              placeholder={lang[langKey].apiKeyPlaceholder}
              onChange={(e) => setKey(e.target.value)}
            ></input>
          </div>
        </form>
      </div>
      <ToastMessage
        message={showToast.message}
        showToast={showToast.show}
        setShowToast={setShowToastCallback}
      />
    </>
  );
};

export default GPTSearchBar;
