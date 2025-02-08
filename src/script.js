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
