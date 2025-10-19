/* eslint-disable react/prop-types */
function MovieDetails({ movie, onClose }) {
  console.log(movie);

  if (!movie || !movie.overview) {
    return (
      <h1 className="text-red-600 text-[3.2rem] font-extralight">
        Sorry! The extra details could not be found, Please go back to the
        Homepage
      </h1>
    );
  }
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const formatMoney = (n) => {
    if (n <= 0) return "Not Available";
    if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)} billion`;
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)} million`;
    return `$${(n / 1_000).toFixed(1)} thousand`;
  };

  const movieDetails = [
    {
      label: "Overview",
      value: movie.overview || "Not Available",
    },
    {
      label: "Release Date",
      value: formatDate(movie.release_date),
    },
    {
      label: movie.production_countries.length > 1 ? "Countries" : "Country",
      value: movie.production_countries.map((c) => c.name).join(" • "),
    },
    {
      label: movie.spoken_languages.length > 1 ? "Languages" : "Language",
      value: movie.spoken_languages.map((l) => l.english_name).join(" • "),
    },
    {
      label: "Budget",
      value: formatMoney(movie.budget),
    },
    {
      label: "Revenue",
      value: formatMoney(movie.revenue),
    },
    {
      label: "Tagline",
      value: movie.tagline || "Not Available",
    },
    {
      label:
        movie.production_companies.length > 1
          ? "Production Companies"
          : "Production Company",
      value:
        movie.production_companies.map((c) => c.name).join(" • ") ||
        "Not Available",
    },
  ];

  return (
    <>
      <div className="movie__detail--box box-shadow mt-[24rem] max-2xl:w-[960px] max-md:w-[480px]  max-lg:w-[600px] w-[1600px] bg-[#0F0D23] rounded-3xl px-[6rem] py-[6rem] [70vh] transform -translate-x-[-1/2]">
        <div className="movie__details--header flex  justify-between items-center">
          <h1 className="movie__title text-white flex flex-wrap text-[4.2rem]">
            {movie.title}
          </h1>
          <p className="movie__rating text-white text-[2.4rem] flex items-center gap-[0.6rem] font-black rounded-2xl px-[1.2rem] py-[1.8rem] bg-[#221F3D]">
            ⭐{" "}
            {movie.vote_average === 0 ? (
              "N/A"
            ) : (
              <>
                {movie.vote_average.toFixed(1)}{" "}
                <span className={`text-[#A8B5DB] font-medium span--te `}>
                  /10
                  <span className="max-lg:hidden ml-0.5">
                    ({movie.vote_count.toFixed(0)}👤 )
                  </span>
                </span>
              </>
            )}
          </p>
        </div>
        <div className="movie__extra--details flex justify-start max-lg:justify-center items-center gap-[1.2rem] text-[1.8rem]">
          <p className="movie__release--date text-[#A8B5DB]">
            {movie.release_date.split("-")[0]}
          </p>
          <span className="text-[#a8b5d8] text-[1.8rem]">•</span>
          <p className="movie__runtime text-[#A8B5DB]">
            {Math.floor((movie.runtime || 0) / 60)}h &nbsp;
            {(movie.runtime || 0) % 60}min
          </p>
          <span className="text-[#a8b5d8] text-[1.8rem]">•</span>
          <p className="movie__language text-[#A8B5DB]">{movie.status}</p>
        </div>
        <div className="movie__details--main max-2xl:flex-col max-2xl:items-center flex justify-center gap-[12rem] items-start">
          <div className="movie__details--img">
            <img
              className="w-[50rem] h-[70rem] object-cover rounded-lg text-white text-xl"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
          <div className="movie__details--info max-2xl:text-center">
            <ul className="movie__details--list flex flex-col gap-[4.8rem] ">
              <li className="flex gap-[6rem] items-start max-xl:justify-center">
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
              {movieDetails.map(({ label, value }, index) => (
                <MovieDetail title={label} key={index} content={value} />
              ))}
            </ul>
          </div>
        </div>
        <button
          className="text-[#121212] hover:cursor-pointer hover:scale-110 hover:bg-[#AB8BFF] bg-[#D6C7FF] hmb-button rounded-3xl text-[2.4rem]"
          onClick={onClose}
        >
          Visit Homepage
        </button>
      </div>
    </>
  );
}
function MovieDetail({ title, content }) {
  return (
    <li className="flex gap-[6rem] items-start max-xl:justify-center">
      <p className="text-[#A8B5DB] text-[1.8rem]">{title}</p>
      <span
        className={`text-[1.6rem] max-w-[50rem] text-left ${
          title === "Overview" ? "text-white" : "text-[#D6C7FF]"
        }`}
      >
        {content}
      </span>
    </li>
  );
}
export default MovieDetails;
