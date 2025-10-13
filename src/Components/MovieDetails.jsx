/* eslint-disable react/prop-types */
// ERROR HANDLE DIFFERENT COUNTRIES
//FIX MULTIPE COUNTRIES
function MovieDetails({ movie, onClose }) {
  console.log(movie);

  return (
    <div className="movie__detail--box box-shadow mt-[24rem] min-w-[1600px] bg-[#0F0D23] rounded-3xl px-[6rem] py-[6rem] min-h-[70vh]">
      <div className="movie__details--header flex justify-between items-center">
        <h1 className="movie__title text-white text-[4.2rem]">{movie.title}</h1>
        <p className="movie__rating text-white text-[2.4rem] flex items-center gap-[0.6rem] font-black rounded-2xl px-[1.2rem] py-[1.8rem] bg-[#221F3D]">
          ⭐{" "}
          {movie.vote_average == 0 ? (
            "N/A"
          ) : (
            <>
              {movie.vote_average.toFixed(1)}{" "}
              <span className="text-[#A8B5DB] font-medium span--te">
                /10 ({movie.vote_count.toFixed(0)}👤)
              </span>
            </>
          )}
        </p>
      </div>
      <div className="movie__extra--details flex justify-start items-center  gap-[1.2rem] text-[1.8rem]">
        <p className="movie__releade--date text-[#A8B5DB]">
          {movie.release_date.split("-")[0]}
        </p>
        <span className="text-[#a8b5d8] text-[1.8rem]">•</span>
        <p className="movie__runtieme text-[#A8B5DB]">
          {(movie.runtime / 60).toLocaleString().split(".")[0]}h &nbsp;
          {movie.runtime % 60}min
        </p>
        <span className="text-[#a8b5d8] text-[1.8rem]">•</span>
        <p className="movie__lagnuage text-[#A8B5DB]">{movie.status}</p>
      </div>
      <div className="movie__details--main flex justify-center gap-[12rem] items-start ">
        <div className="movie__details--img  ">
          <img
            className="w-[50rem] h-[70rem]  object-cover  rounded-lg text-white text-xl"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.name}
          />
        </div>
        <div className="movie__details--info ">
          <ul className="movie__details--list  flex flex-col gap-[4.8rem]  justify-self-start">
            <li className="flex gap-[6rem] items-start">
              <p className="text-[#A8B5DB] text-[1.8rem]">Genres</p>
              <span className="flex gap-[3rem]">
                {movie.genres.map((genre) => (
                  <p
                    className="text-[2rem] movie-genre bg-[#221F3D] uppercase rounded-2xl px-[1.2rem] py-[1.8rem] text-white"
                    key={genre.name}
                  >
                    {genre.name}
                  </p>
                ))}
              </span>
            </li>
            <li className="flex gap-[6rem] items-start">
              <p className="text-[#A8B5DB] text-[1.8rem]">Overview</p>
              <span className="text-[1.6rem] max-w-[50rem] text-left text-white">
                {movie.overview}
              </span>
            </li>
            <li className="flex gap-[6rem] items-start">
              <p className="text-[#A8B5DB] text-[1.8rem]">Release Date</p>
              <span className="text-[#D6C7FF] text-[1.8rem]">
                {new Date(movie.release_date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}{" "}
              </span>
            </li>
            <li className="flex gap-[6rem] items-start">
              <p className="text-[#A8B5DB] text-[1.8rem]">
                {movie.production_countries.length > 1
                  ? "Countries"
                  : "Country"}
              </p>
              <span className="flex gap-[3rem]">
                {movie.production_countries.map((country, index) => (
                  <>
                    <p className="text-[#D6C7FF] text-[1.8rem]">
                      {country.name}
                    </p>

                    {index < movie.production_countries.length - 1 && (
                      <span className="text-[#A8B5DB] text-[2rem]">•</span>
                    )}
                  </>
                ))}
              </span>
            </li>
            <li className="flex gap-[6rem] items-start">
              <p className="text-[#A8B5DB] text-[1.8rem]">
                {movie.spoken_languages > 1 ? "Languages" : "Language"}
              </p>
              <span className="flex gap-[3rem]">
                {movie.spoken_languages.map((language, index) => (
                  <>
                    <p className="text-[#D6C7FF] text-[1.8rem]">
                      {language.english_name}
                    </p>

                    {index < movie.spoken_languages.length - 1 && (
                      <span className="text-[#A8B5DB] text-[2rem]">•</span>
                    )}
                  </>
                ))}
              </span>
            </li>
            <li className="flex gap-[6rem] items-start">
              <p className="text-[#A8B5DB] text-[1.8rem]">Budget</p>
              <span className="text-[#d6c7ff] text-[1.8rem]">
                {movie.budget > 0
                  ? `${
                      movie.budget >= 1_000_000
                        ? `$${(movie.budget / 1_000_000).toFixed(1)} million`
                        : `$${(movie.budget / 1_000).toFixed(1)} thousand`
                    }`
                  : "Not Available"}
              </span>
            </li>
            <li className="flex gap-[6rem] items-start">
              <p className="text-[#A8B5DB] text-[1.8rem]">Revenue</p>
              <span className="text-[#d6c7ff] text-[1.8rem]">
                {movie.revenue > 0
                  ? movie.revenue >= 1_000_000_000
                    ? `$${(movie.revenue / 1_000_000_000).toFixed(1)} billion`
                    : movie.revenue >= 1_000_000
                    ? `$${(movie.revenue / 1_000_000).toFixed(1)} million`
                    : `$${(movie.revenue / 1_000).toFixed(1)} thousand`
                  : "Not Available"}
              </span>
            </li>
            <li className="flex gap-[6rem] items-start">
              <p className="text-[#A8B5DB] text-[1.8rem]">Tagline</p>
              <span className="text-[#d6c7ff] text-[1.8rem]">
                {movie.tagline ? movie.tagline : "Not Available"}
              </span>
            </li>
            <li className="flex flex-wrap gap-[6rem] items-start">
              <p className="text-[#A8B5DB] text-[1.8rem]">
                {movie.production_companies.length > 1
                  ? "Production Comapnies"
                  : "Production Company"}
              </p>
              <span className="flex flex-wrap gap-[3rem] max-w-[50rem]">
                {movie.production_companies.map((comapny, index) => (
                  <>
                    <p className="text-[#D6C7FF] text-[1.8rem]">
                      {comapny.name}
                    </p>

                    {index < movie.production_companies.length - 1 && (
                      <span className="text-[#A8B5DB] text-[2rem]">•</span>
                    )}
                  </>
                ))}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <button
        className="text-[#121212] hover:cursor-pointer hover:scale-110  hover:bg-[#AB8BFF] bg-[#D6C7FF] hmb-button rounded-3xl text-[2.4rem]"
        onClick={onClose}
      >
        Visit Homepage
      </button>
    </div>
  );
}

export default MovieDetails;
