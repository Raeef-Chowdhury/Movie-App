function Header() {
  return (
    <>
      <header className="mt-[4rem]">
        <div className="img__box flex flex-col gap-[1.2rem] items-center justify-center">
          <img src="logo.png" alt="logo img" className="w-[10%] " />
          <img src="hero-img.png" alt="hero__img" />
        </div>
        <h1 className="">
          Find <span className="text-gradient">Movies</span>
          You will Enjoy Without the Hassle
        </h1>
      </header>
    </>
  );
}
export default Header;
