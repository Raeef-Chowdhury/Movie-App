import "./App.css";
import "./Components/Header";
import "./Components/Search";
import Header from "./Components/Header";
import Search from "./Components/Search";
import { useState, useEffect } from "react";
/* eslint-disable react/prop-types */
// API ENDPOINT = https://api.themoviedb.org/3/search/movie

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };
  const fetchMovies = async () => {
    try {
      const endpoint = `${API_URL}/discover/movie?sort_by=populairty,desc`;
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
    fetchMovies();
  }, []);

  return (
    <>
      <main className="flex justify-center items-start ">
        <div className="pattern" />
        <div className="wrapper flex justify-center mt-[4rem]">
          <Header />
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <section className="movies__list">
            {isLoading ? (
              <p className="text-white">Loading..</p>
            ) : (
              <ul>
                {movieList.map((movie) => (
                  <li key={movie.id} className="text-white">
                    {movie.title}
                  </li>
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
