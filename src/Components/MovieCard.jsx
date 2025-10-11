/* eslint-disable react/prop-types */
const genres = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};
function MovieCard({ movie, key, onClick }) {
  console.log(key);
  console.log(movie);

  const charCount = movie.title.length;

  return (
    <>
      <div
        onClick={onClick}
        className="movie--card__container truncate transition-all hover:scale-110 hover:cursor-pointer hover:shadow-[0px_3px_6px_6px_rgba(255,255,255,0.1)] p-5 bg-dark-100  w-[30rem] h-[50rem] max-w-[60rem] flex flex-col items-start justify-start rounded-2xl"
      >
        <div className="img__box flex items-start  ">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://file+.vscode-resource.vscode-cdn.net/c%3A/Users/ripon/OneDrive/Desktop/Raeef%27s%20Coding/movie-app-tutorial/public/no-Poster.png?version%3D1759382850466"
            }
            alt={movie.title}
            className="w-[26.4rem] h-[40rem] object-cover  rounded-lg text-white text-xl"
          />
        </div>
        <div className="flex gap-[1.2rem] flex-col ">
          <p
            className={`movie__title text-white  font-black  moviecard-text text-left truncate ${
              charCount > 29 ? "text-[1.6rem]" : "text-[1.6rem]"
            } `}
          >
            {movie.title}
          </p>
          <div className="movie__info--box text-left flex gap-[0.6rem] items-center ">
            <p className="mvoie__rating text-white text-[1.6rem] font-black">
              ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
            </p>
            <span className="text-gray-100 text-[1.8rem]">•</span>
            <p className="movie__genre text-gray-100 text-[1.6rem] font-medium">
              {genres[movie.genre_ids[0]]}
            </p>
            <span className="text-gray-100 text-[1.8rem]">•</span>
            <p className="movie__release text-gray-100 text-[1.6rem] font-medium">
              {movie.release_date.split("-")[0]}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default MovieCard;
