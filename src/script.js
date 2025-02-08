const input = document.querySelector(".search__input");
const searchbar = document.querySelector(".searchbar");
const bookMarkIconBox = document.querySelectorAll(".card__item--icon");
const bookMarkIcon = document.querySelectorAll(".bookmark__icon");
console.log(bookMarkIcon, bookMarkIconBox);

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
    console.log(slide, index);
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
