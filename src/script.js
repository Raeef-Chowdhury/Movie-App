const input = document.querySelector(".search__input");
const searchbar = document.querySelector(".searchbar");

searchbar.addEventListener("click", function () {
  input.classList.toggle("w-[25rem]");
  input.classList.toggle("w-0");
  input.classList.toggle("bg-white");
  console.log(searchbar, input);
});
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
}
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
    console.log(movieDetails);

    return movieDetails;
  } catch (error) {
    console.error(`Error fetching movie details for ID ${movieId}:`, error);
    return "N/A"; // Fallback if request fails
  }
}

async function renderData(movie, id, index) {
  const movieListContainer = document.querySelectorAll(".card__list--box");
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
  const movieDetails = await getMovieDetails(id);

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
               ${movieDetails.runtime}m
                </p>
                <p
                  class="text-[1.8rem] text-gray-300 card__item--category flex items-center justify-center gap-[0.4rem] px-[0.8rem] py-[0.4rem] border-gray-700 border-[1px] rounded-[1.2rem] w-fit"
                >
                  <ion-icon name="film-outline"></ion-icon>Movie
                </p>
              </div>
          `;
  movieListContainer.forEach((movieContainer) =>
    movieContainer.appendChild(movieItem)
  );
  movieItem.appendChild(movieCard);
  updateSlides();
  movieItem.addEventListener("click", () => updateModal(movieDetails));
}
fetchMovies();
updateBookmarks();
///////////////////////////////////////////////////////////////////////////////
// MODAL
function updateModal(movieDetails) {
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");
  modal.classList.remove("hidden");
  modal.classList.add(
    "pb-[4rem]",
    "fixed",
    "top-[50%]",
    "left-[50%]",
    "transform-[translate(-50%,-50%)]",
    "h-[60rem]",
    "min-w-[80rem]",
    "bg-[#314def]",
    "z-[101]",
    "rounded-[2rem]",
    "shadow-2xl",
    "overflow-y-scroll",
    "overflow-x-hidden"
  );

  overlay.classList.remove("hidden");
  overlay.classList.add(
    "fixed",
    "top-[0]",
    "left-[0]",
    "w-full",
    "h-full",
    "bg-[rgba(0,0,0,0.5)]",
    "z-[100]",
    "blur-[4px]",
    "transition-all"
  );
  const movieSales = Number(movieDetails.revenue) - Number(movieDetails.budget);
  const movieRating = movieDetails.vote_average * 10;
  const releaseDate = new Date(movieDetails.release_date);
  const formattedReleaseDate = formatReleaseDate(releaseDate);

  console.log(movieDetails);

  modal.innerHTML = `<div class="thumbnail flex gap-[2.4rem] m-[4rem]">
<div class="img__box">
<img
  src="${`https://image.tmdb.org/t/p/w780${movieDetails.backdrop_path}`}"
  alt="tandoori"
  class="min-w-[27rem] h-[20rem] rounded-[1.2rem]"
/>
</div>
<div class="main__text--box">
<h1
  class="modal__title text-[#001524] text-[3.2rem] text-center font-semibold"
>
  ${movieDetails.original_title}
</h1>
<div class="genres">
  <ul
    class="genre__list flex gap-[2.4rem] items-center justify-center mt-[4rem]"
  >
  ${movieDetails.genres
    .map(
      (genre) =>
        `<li
      class="genre__list--item border-white border-[2px] rounded-[1.2rem] bg-[#001524] text-white text-[1.2rem] px-[1.2rem] py-[0.8rem]"
    >
      ${genre.name}
    </li>`
    )
    .join("")}
  </ul>
</div>
</div>
</div>
<div
class="extra__detail mx-[4rem] mt-[3.6rem] flex gap-[7.2rem] items-start"
>
<div class="max-w-[30rem]">
<h1 class="extra__heading text-[2.4rem] underline font-semibold">
  DESCRIPTION
</h1>
<p
  class="extra__detail--text font-medium text-gray-800 text-[1.6rem]"
>
  ${movieDetails.overview}
</p>
</div>
<div class="extra__info--list">
<ul class="extra__info flex flex-col gap-[3.2rem]">
  <li
    class="extra__info--item text-[1.8rem] font-semibold text-gray-200 uppercase items-center"
  >
    Release Date:
    <span class="text-[#001524]">${formattedReleaseDate}</span>
  </li>
  <li
    class="extra__info--item text-[1.8rem] font-semibold text-gray-200 uppercase items-center"
  >
    Rating:
    <span class="text-[#001524]">${movieRating.toFixed(2)}</span>
  </li>
  <li
    class="extra__info--item text-[1.8rem] font-semibold text-gray-200 uppercase items-center"
  >
    Poplarity:
    <span class="text-[#001524]">${movieDetails.popularity}</span>
  </li>
  <li
    class="extra__info--item text-[1.8rem] font-semibold text-gray-200 uppercase items-center"
  >
    Box Office Sale:
    <span class="text-[#001524]">$${movieSales.toLocaleString()}</span>
  </li>
</ul>
</div>
</div>
<div class="icon__box absolute top-[-1%] left-[93%]">
<ion-icon
name="close-outline"
class="modal__exit--btn text-[6rem] text-[#001524] transition-all hover:text-red-900"
></ion-icon>
</div>
<div
class="crew__box mt-[4.8rem] flex flex-col items-center justify-center"
>
<h1
class="crew__box--heading text-[2.4rem] underline font-semibold uppercase"
>
Crew & Cast
</h1>
<ul class="crew__box--list mt-[1.2rem] flex flex-col gap-[1.2rem]">
<li
  class="crew__list--item text-gray-200 text-[1.2rem] flex gap-[0.8rem] items-center"
>
  <span class="text-[1.6rem] uppercase font-semibold text-[#001524]"
    >Leonardo Dicaprico</span
  >
  as
  <span class="text-[1.6rem] uppercase font-semibold text-[#001524]"
    >Dom Cobb</span
  >
</li>
<li
  class="crew__list--item text-gray-200 text-[1.2rem] flex gap-[0.8rem] items-center"
>
  <span class="text-[1.6rem] uppercase font-semibold text-[#001524]"
    >Leonardo Dicaprico</span
  >
  as
  <span class="text-[1.6rem] uppercase font-semibold text-[#001524]"
    >Dom Cobb</span
  >
</li>
<li
  class="crew__list--item text-gray-200 text-[1.2rem] flex gap-[0.8rem] items-center"
>
  <span class="text-[1.6rem] uppercase font-semibold text-[#001524]"
    >Leonardo Dicaprico</span
  >
  as
  <span class="text-[1.6rem] uppercase font-semibold text-[#001524]"
    >Dom Cobb</span
  >
</li>
<li
  class="crew__list--item text-gray-200 text-[1.2rem] flex gap-[0.8rem] items-center"
>
  <span class="text-[1.6rem] uppercase font-semibold text-[#001524]"
    >Leonardo Dicaprico</span
  >
  as
  <span class="text-[1.6rem] uppercase font-semibold text-[#001524]"
    >Dom Cobb</span
  >
</li>
<li
  class="crew__list--item text-gray-200 text-[1.2rem] flex gap-[0.8rem] items-center"
>
  <span class="text-[1.6rem] uppercase font-semibold text-[#001524]"
    >Leonardo Dicaprico</span
  >
  as
  <span class="text-[1.6rem] uppercase font-semibold text-[#001524]"
    >Dom Cobb</span
  >
</li>
<li
  class="crew__list--item text-gray-200 text-[1.2rem] flex gap-[0.8rem] items-center"
>
  <span class="text-[1.6rem] uppercase font-semibold text-[#001524]"
    >Leonardo Dicaprico</span
  >
  as
  <span class="text-[1.6rem] uppercase font-semibold text-[#001524]"
    >Dom Cobb</span
  >
</li>
</ul>
</div>`;
  const deleteModal = document.querySelector(".modal__exit--btn");
  overlay.addEventListener("click", function () {
    if (!modal.classList.contains("hidden")) {
      modal.classList.add("hidden");
      overlay.classList.add("hidden");
    }
  });

  deleteModal.addEventListener("click", function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  });
  function formatReleaseDate(date) {
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    const dayWithSuffix = getDayWithSuffix(day);
    return `${dayWithSuffix} ${month} ${year}`;
  }

  function getDayWithSuffix(day) {
    if (day > 3 && day < 21) return day + "th";
    const suffixes = ["st", "nd", "rd"];
    const lastDigit = day % 10;
    return day + (suffixes[lastDigit - 1] || "th");
  }
}
