const input = document.querySelector(".search__input");
const searchbar = document.querySelector(".searchbar");
const bookMarkIconBox = document.querySelectorAll(".card__item--icon");
const bookMarkIcon = document.querySelectorAll(".bookmark__icon");

bookMarkIconBox.forEach((icon, index) =>
  icon.addEventListener("click", function () {
    addBookMarkStyle(bookMarkIcon[index]);
  })
);
function addBookMarkStyle(icon) {
  if (icon.getAttribute("name") === "star-outline") {
    icon.setAttribute("name", "star");
  } else {
    icon.setAttribute("name", "star-outline");
  }
}

searchbar.addEventListener("click", function () {
  input.classList.toggle("w-[25rem]");
  input.classList.toggle("w-0");
  input.classList.toggle("bg-white");
});
////////////////////////////////////////
// Slide

const slides = document.querySelectorAll(".card__list--item");
const slideshow = document.querySelector(".card__list--box");
const arrowRight = document.querySelector(".arrow__right");
const arrowLeft = document.querySelector(".arrow__left");

let curSlide = 0;
const maxSlide = slides.length;

const goToSlide = (slideIndex) => {
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${100 * (index - slideIndex)}%)`;
  });
};

goToSlide(curSlide);

const prevSlide = () => {
  curSlide = curSlide === 0 ? maxSlide - 1 : curSlide - 1;
  goToSlide(curSlide);
};

const nextSlide = () => {
  curSlide = curSlide === maxSlide - 1 ? 0 : curSlide + 1;
  goToSlide(curSlide);
};

arrowLeft.addEventListener("click", nextSlide);
arrowRight.addEventListener("click", prevSlide);
////////////////////////////////////////////////////////////////////////////////////
// Display Movies
const movieContainer = document.querySelector(".card__list--box");
let movies = [];

const API_KEY = "0794c87334ee7ae338d5b88ca9d635a3";
const BASE_URL = "https://api.themoviedb.org/3";
const ENDPOINT = "/movie/popular";

async function fetchMovies() {
  try {
    const response = await fetch(`${BASE_URL}${ENDPOINT}?api_key=${API_KEY}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const movieList = data.results;
    movieList.forEach((movie, index) => {
      renderData(movie, movie.id, index);
    });
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}
async function renderData(movie, id, index) {
  console.log(index);

  const slides = document.querySelectorAll(".card__list--item");
  const arrowRight = document.querySelector(".arrow__right");
  const arrowLeft = document.querySelector(".arrow__left");

  let curSlide = 0;
  const maxSlide = slides.length;

  const goToSlide = (slideIndex) => {
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${100 * (index - slideIndex)}%)`;
    });
  };

  goToSlide(curSlide);

  const prevSlide = () => {
    curSlide = curSlide === 0 ? maxSlide - 1 : curSlide - 1;
    goToSlide(curSlide);
  };

  const nextSlide = () => {
    curSlide = curSlide === maxSlide - 1 ? 0 : curSlide + 1;
    goToSlide(curSlide);
  };

  arrowLeft.addEventListener("click", nextSlide);
  arrowRight.addEventListener("click", prevSlide);
  const movieListContainer = document.querySelector(".card__list--box");

  // Create a new list item element for the movie
  const movieItem = document.createElement("div");
  movieItem.classList.add("card-wrapper");

  const movieCard = document.createElement("li");
  movieCard.classList.add(
    "card__list--item",
    "max-w-[27rem]",
    "border-white",
    "border-[1px]",
    "rounded-[1.2rem]",
    "transition-all",
    "hover:scale-y-105",
    "hover:scale-x-105",
    "absolute",
    "max-h-[20rem]"
  );

  movieCard.innerHTML = `
            
              <div
                class="card__item--icon group absolute left-[3%] top-[3%] rounded-full bg-[#314def] p-[0.2rem] transition-all hover:bg-white"
              >
                <ion-icon
                  name="star-outline"
                  class="bookmark__icon text-white text-[4.8rem] group-hover:text-[#314def]"
                ></ion-icon>
              </div>
              <img
                src="${`https://image.tmdb.org/t/p/w300${movie.poster_path}`}"
                alt="${movie.title}"
                class="max-w-[100%] max-h-[10%] overflow-hidden rounded-[1.2rem]"
              />
              <div
                class="card__item--info flex flex-col items-center gap-[0.6rem] pb-[1.2rem]"
              >
                <p
                  class="text-[2.4rem] text-white uppercase card__item--headng mt-[1rem]"
                >
                  ${movie.title}
                </p>
                <p class="text-[1.8rem] text-gray-400 card__item--duration">
               ${movie.runtime}m
                </p>
                <p
                  class="text-[1.8rem] text-gray-300 card__item--category flex items-center justify-center gap-[0.4rem] px-[0.8rem] py-[0.4rem] border-gray-700 border-[1px] rounded-[1.2rem] w-fit"
                >
                  <ion-icon name="film-outline"></ion-icon>Movie
                </p>
              </div>
          `;

  // Add the movie card to the list container
  movieListContainer.appendChild(movieItem);
  movieItem.appendChild(movieCard);
}
fetchMovies();
