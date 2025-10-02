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
function MovieCard({ movie, id }) {
  console.log(id);
  console.log(movie);
  const charCount = movie.title.length;

  return (
    <>
      <div className="movie--card__container p-5 bg-dark-100  w-[30rem] h-[28.2rem] max-w-[140rem] flex flex-col items-start justify-start rounded-2xl">
        <div className="img__box flex items-start  ">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            className="w-[26.4rem] h-[17rem] object-cover  rounded-lg"
          />
        </div>
        <div className="flex gap-[1.2rem] flex-col ">
          <p
            className={`movie__title text-white  font-black  moviecard-text text-left ${
              charCount > 29 ? "text-[1rem]" : "text-[1.6rem]"
            } `}
          >
            {movie.title}
          </p>
          <div className="movie__info--box text-left flex gap-[0.6rem] items-center ">
            <p className="mvoie__rating text-white text-[1.6rem] font-black">
              ⭐ {(movie.vote_average / 2).toFixed(1)}
            </p>
            <span className="text-gray-100 text-[1.8rem]">•</span>
            <p className="movie__genre text-gray-100 text-[1.6rem] font-medium">
              {genres[movie.genre_ids[0]]}
            </p>
            <span className="text-gray-100 text-[1.8rem]">•</span>
          </div>
        </div>
      </div>
    </>
  );
}
export default MovieCard;
