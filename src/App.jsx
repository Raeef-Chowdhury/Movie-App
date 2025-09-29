import "./App.css";
import "./Components/Header";
import "./Components/Search";
import Header from "./Components/Header";
import Search from "./Components/Search";
import { useState } from "react";
/* eslint-disable react/prop-types */

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <main className="flex justify-center items-start ">
        <div className="pattern" />
        <div className="wrapper flex justify-center mt-[4rem]">
          <Header />
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </main>
    </>
  );
}

export default App;
