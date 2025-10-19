/* eslint-disable react/prop-types */
import { motion } from "motion/react";
function Search({ searchTerm, setSearchTerm }) {
  return (
    <>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="searchbar-container max-w-6xl max-sm:max-w-2xl w-full  bg-light-100/5 px-[6rem]  py-[6rem] scale-110 rounded-lg mx-auto mt-6 "
      >
        <div className="flex items-center gap-[1.2rem] searchbar-box">
          <img
            src="../../public/Search.png"
            alt="search icon"
            className="w-[5%] "
          />
          <input
            className="text-white text-[1.8rem] w-full outline-none  "
            id="searchbar"
            type="text"
            placeholder="Search throguh 300+ movies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </motion.div>
    </>
  );
}
export default Search;
