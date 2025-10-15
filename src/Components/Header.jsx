import { motion } from "motion/react";
function Header() {
  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-[4rem] max-w-7xl"
      >
        <div className="img__box flex flex-col gap-[3.6rem] items-center justify-center ">
          <img src="logo.png" alt="logo img" className="w-[10%] " />
          <img src="hero-img.png" alt="hero__img" className="scale-125" />
        </div>
        <h1 className="text-[5.6rem] leading-snug tracking-wide  ">
          Find
          <span className="text-gradient pr-[1.2rem] movie-span"> Movies</span>
          You will Enjoy Without the Hassle
        </h1>
      </motion.header>
    </>
  );
}
export default Header;
