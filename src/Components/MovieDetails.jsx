/* eslint-disable react/prop-types */
function MovieDetails({ movie, onClose }) {
  console.log(movie);

  return (
    <div>
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
