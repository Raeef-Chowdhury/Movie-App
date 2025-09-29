import "./App.css";
import { useState, useEffect } from "react";
/* eslint-disable react/prop-types */

function App() {
  return (
    <>
      <div className="flex  margin items-center max-w-[fit-content] flex-col gap-[4rem] ">
        <Card title="STAR WARS" />
        <Card title="AVATAR" />
        <Card title="THE LION KING" />
      </div>
    </>
  );
}
function Card({ title }) {
  const [movieCount, setMovieCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  useEffect(() => {
    console.log(`${title} has been ${hasLiked ? "liked" : "unliked"}`);
  }, [hasLiked]);
  return (
    <>
      <div
        onClick={() => setMovieCount(movieCount + 1)}
        className="card  bg-[#4b5362] gap-[1.2rem] justify-center max-w-[102.4rem] border-2 border-[#303030] p-[2rem] m-[1rem] rounded-[1rem] min-h-[10rem]"
      >
        <h1 className="text-[#f3f3f3] text-[4.8rem]">{title}</h1>
        <h1>This has been interacted for {movieCount} times</h1>
        <button
          className="text-[3rem] bg-[transparent] w-[100%] text-right cursor-pointer"
          onClick={() => setHasLiked(!hasLiked)}
        >
          {hasLiked ? "LIKED" : "LIKE"}
        </button>
      </div>
    </>
  );
}

export default App;
