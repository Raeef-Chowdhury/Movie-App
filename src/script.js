const input = document.querySelector(".search__input");
const searchbar = document.querySelector(".searchbar");
function addBookmarks() {
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
}
// function updateBookmarks(iconBox, icon) {
//   iconBox.forEach((iBox) => {
//     iBox.addEventListener("click", function () {
//       icon.forEach((i) => {
//         console.log(i);

//         if (i.getAttribute("name") === "star-outline") {
//           i.setAttribute("name", "star");
//         } else {
//           i.setAttribute("name", "star-outline");
//         }
//       });
//     });
//   });
// }
function updateBookmarks() {
  document.body.addEventListener("click", function (event) {
    if (event.target.closest(".card__item--icon")) {
      const curIcon = event.target
        .closest(".card__item--icon")
        .querySelector(".bookmark__icon");

      if (curIcon.getAttribute("name") === "star-outline") {
        curIcon.setAttribute("name", "star");
      } else {
        curIcon.setAttribute("name", "star-outline");
      }
    }
  });
}
////////////////////////////////////////
// Slide

const updateSlides = () => {
  const slides = document.querySelectorAll(".card__list--item");
  const arrowRight = document.querySelector(".arrow__right");
  const arrowLeft = document.querySelector(".arrow__left");
  let curSlide = 0;
  const maxSlide = slides.length;

  const goToSlide = (slideIndex) => {
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${115 * (index - slideIndex)}%)`;
    });
  };

  goToSlide(curSlide);

  const prevSlide = () => {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
  };

  const nextSlide = () => {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
  };

  arrowLeft.addEventListener("click", prevSlide);
  arrowRight.addEventListener("click", nextSlide);
};
updateSlides();
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
async function getMovieDetails(movieId) {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const movieDetails = await response.json();
    return movieDetails.runtime; // Returns runtime in minutes
  } catch (error) {
    console.error(`Error fetching movie details for ID ${movieId}:`, error);
    return "N/A"; // Fallback if request fails
  }
}

async function renderData(movie, id, index) {
  const movieListContainer = document.querySelector(".card__list--box");
  const headingTitle = document.querySelector(".card__item--heading");
  headingTitle.textContent = `${ENDPOINT.split("/").pop().split("-").pop()}`;

  const movieItem = document.createElement("div");
  movieItem.classList.add("card-wrapper");

  const movieCard = document.createElement("li");
  movieCard.classList.add(
    "card__list--item",
    "max-w-[27rem]",
    "border-white",
    "border-[2px]",
    "rounded-[1.2rem]",
    "transition-all",
    "hover:-translate-y-4",
    "absolute",
    "max-h-[60rem]",
    "shadow-[0.8rem_0.8rem_1.6rem_rgba(255,255,255,0.1)]"
  );

  // Fetch runtime asynchronously
  const runtime = await getMovieDetails(id);

  movieCard.innerHTML = `
              <div
                class="card__item--icon group absolute left-[3%] top-[3%] rounded-full bg-[#314def] p-[0.2rem] transition-all hover:bg-white shadow-2xl"
              >
                <ion-icon
                  name="star-outline"
                  class="bookmark__icon text-white text-[4.8rem] group-hover:text-[#314def]"
                ></ion-icon>
              </div>
              <img
                src="${
                  movie.backdrop_path
                    ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
                    : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                }"
                alt="${movie.title}"
                class="w-[36rem] h-[20rem] overflow-hidden rounded-[1.2rem] object-cover"
              />
              <div
                class="card__item--info flex flex-col items-center gap-[0.6rem] pb-[1.2rem]"
              >
                <p
                  class="text-[2.4rem] text-white uppercase card__item--headng mt-[1rem] px-[0.8rem] text-center"
                >
                  ${movie.title}
                </p>
                <p class="text-[1.8rem] text-gray-400 card__item--duration">
               ${runtime}m
                </p>
                <p
                  class="text-[1.8rem] text-gray-300 card__item--category flex items-center justify-center gap-[0.4rem] px-[0.8rem] py-[0.4rem] border-gray-700 border-[1px] rounded-[1.2rem] w-fit"
                >
                  <ion-icon name="film-outline"></ion-icon>Movie
                </p>
              </div>
          `;

  movieListContainer.appendChild(movieItem);
  movieItem.appendChild(movieCard);
  updateSlides();
  movieItem.addEventListener("click", function () {
    console.log(`cicked[${index}]`);
  });
}
fetchMovies();
updateBookmarks();
