/* eslint-disable react/prop-types */
function TrendingCard({ id, onClick, movie, index }) {
  return (
    <>
      <div key={id} className="flex items-center" onClick={onClick}>
        <div className="trending-num   z-[-10]  text-[#CECEFB1A] text-[14rem] flex items-center justify-center font-bold text-sm ">
          {index + 1}
        </div>

        <div className="relative overflow-hidden rounded-lg bg-gray-800 hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 cursor-pointer transform hover:scale-105 ">
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
            className=" object-cover hover:brightness-75 transition w-[12.5rem] h-[18rem]"
          />
        </div>
      </div>
    </>
  );
}
export default TrendingCard;
