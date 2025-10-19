import "./App.css";
import { motion } from "motion/react";
import Header from "./Components/Header";
import Search from "./Components/Search";
import MovieCard from "./Components/MovieCard";
import MovieDetails from "./Components/MovieDetails";
import TrendingCard from "./Components/TrendingCard.jsx";
import { useDebounce } from "react-use";

import { useState, useEffect } from "react";
/* eslint-disable react/prop-types */
// API ENDPOINT = https://api.themoviedb.org/3/search/movie
// TODO:RESPONSVIENESS
// TODO:Multiple Pages maybe?

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [trending, setTrending] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [errMsg, setErrMsg] = useState(false);

  useDebounce(
    () => {
      setDebouncedSearch(searchTerm);
    },
    500,
    [searchTerm]
  );

  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const API_MOVIE_KEY = import.meta.env.VITE_TMDB_API_KEY_MOVIE;

  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  const fetchTrendingMovies = async () => {
    try {
      const response = await fetch(
        `${API_URL}/trending/movie/week`,
        API_OPTIONS
      );
      if (!response.ok) {
        throw new Error("Can't fetch trending movies");
      }
      const data = await response.json();
      setTrending(data.results.slice(0, 6));
    } catch (err) {
      console.error(`Error fetching trending: ${err}`);
    }
  };

  const handleMovieSelect = async (movie) => {
    const movieID = movie.id;

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_MOVIE_KEY}&language=en-US`
      );
      const data = await response.json();
      console.log(data);
      setSelectedMovie(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const fetchMovies = async (query) => {
    try {
      const endpoint = query
        ? `${API_URL}/search/movie?query=${encodeURI(query)}`
        : `${API_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error("cant fetch movies");
      }
      const data = await response.json();
      if (data.Response === "False") {
        setMovieList([]);
        return;
      }

      setMovieList(data.results);

      if (data.total_results === 0) {
        setErrMsg(true);
      } else if (data.total_results > 0) {
        setErrMsg(false);
      }
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
      <main className="flex justify-center items-start  ">
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pattern"
        />
        <div className="wrapper flex flex-col justify-center items-center gap-[4rem] mt-[4rem]">
          <Header />
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          {errMsg ? (
            <p className="text-red-500 text-[3rem] mt-[4rem] max-w-7xl">
              No movies found, please search for a different movie
            </p>
          ) : null}

          <section className="movies__list w-full">
            {selectedMovie ? (
              <MovieDetails
                movie={selectedMovie}
                onClose={handleCloseModal}
                key={selectedMovie.id}
              />
            ) : (
              <>
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  <>
                    {debouncedSearch === "" && trending.length > 0 && (
                      <div className="mb-[4rem] flex flex-col gap-[6rem]">
                        <h1 className="text-left movie-cat text-[4.2rem] max-lg:text-center mb-[2.4rem]">
                          Trending Now
                        </h1>
                        <ul className="grid trendinglist gap-[9.6rem] grid-cols-6 max-xl:grid-cols-4 justify-center items-center  max-lg:grid-cols-3  max-sm:grid-cols-2">
                          {trending.map((movie, index) => (
                            // eslint-disable-next-line react/jsx-key
                            <TrendingCard
                              movie={movie}
                              index={index}
                              id={movie.id}
                              onClick={() => handleMovieSelect(movie)}
                            />
                          ))}
                        </ul>
                      </div>
                    )}

                    <h1
                      className={`text-left movie-cat text-[4.2rem] max-lg:text-center ${
                        errMsg ? "hidden" : ""
                      }`}
                    >
                      {debouncedSearch === ""
                        ? "Popular Movies"
                        : `Search Results for "${debouncedSearch}"`}
                    </h1>
                    <ul className="grid grid-cols-4 grid-rows-3 gap-[6rem] max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1  justify-items-center mt-[4.8rem] movielist">
                      {movieList.map((movie) => (
                        <MovieCard
                          key={movie.id}
                          movie={movie}
                          onClick={() => handleMovieSelect(movie)}
                        />
                      ))}
                    </ul>
                  </>
                )}
              </>
            )}
          </section>
        </div>
      </main>
    </>
  );
}

export default App;
