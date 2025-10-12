/* eslint-disable react/prop-types */
function MovieDetails({ movie, onClose }) {
  console.log(movie);

  return (
    <div className="movie__detail--box box-shadow mt-[12rem] min-w-[1600px]">
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
                /10 ({movie.vote_count.toFixed(0)})
              </span>
            </>
          )}
        </p>
      </div>
      <button className="text-white" onClick={onClose}>
        Back
      </button>
      <h2 className="text-white">{movie.title}</h2>
      <p className="text-white">{movie.overview}</p>
      <p className="text-white">Release Date: {movie.release_date}</p>
      <p className="text-white">Rating: {movie.vote_average}</p>
    </div>
  );
}

export default MovieDetails;
