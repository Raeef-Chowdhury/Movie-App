import "./App.css";
import Header from "./Components/Header";
import Search from "./Components/Search";
import MovieCard from "./Components/Moviecard";
import { useDebounce } from "react-use";

import { useState, useEffect } from "react";
/* eslint-disable react/prop-types */
// API ENDPOINT = https://api.themoviedb.org/3/search/movie

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useDebounce(
    () => {
      setDebouncedSearch(searchTerm);
    },
    500, // delay (ms)
    [searchTerm] // dependencies
  );
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };
  const fetchMovies = async (query) => {
    try {
      const endpoint = query
        ? `${API_URL}/search/movie?query=${encodeURI(query)}`
        : `${API_URL}/discover/movie?sort_by=populairty.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error("cant fetch movies");
      }
      const data = await response.json();
      console.log(data);
      if (data.Response === "False") {
        setMovieList([]);
        return;
      }
      setMovieList(data.results);
    } catch (err) {
      console.error(`${err}`);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchMovies(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <>
      <main className="flex justify-center items-start ">
        <div className="pattern" />
        <div className="wrapper  flex flex-col justify-center items-center gap-[4rem] mt-[4rem]">
          <Header />
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <section className="movies__list">
            {isLoading ? (
              <p className="text-white">Loading..</p>
            ) : (
              <ul className="grid grid-cols-4 grid-rows-3 gap-[6rem] max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1  justify-items-center mt-[4.8rem] movielist">
                {movieList.map((movie) => (
                  // eslint-disable-next-line react/jsx-key
                  <MovieCard id={movie.id} movie={movie} />
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
    </>
  );
}

export default App;
