const input = document.querySelector(".search__input");
const searchbar = document.querySelector(".searchbar");

searchbar.addEventListener("click", function () {
  input.classList.toggle("w-[25rem]");
  input.classList.toggle("w-0");
  input.classList.toggle("bg-white");
});
