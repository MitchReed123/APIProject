const baseUrl = "https://eonet.sci.gsfc.nasa.gov/api/v3/events?limit=50";
const key = "W3ic4GJkvIT9VcudyjfjIJ2hjquaAqDyOdTKwYxy";

let url;

const searchDate = document.querySelector(".date");
const searchForm = document.querySelector("form");
const submitBtn = document.querySelector(".submit");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const nav = document.querySelector("nav");
const section = document.querySelector("section");

nav.style.display = "none";
let displayav = false;

searchForm.addEventListener("submit", fetchResults);
// searchForm.addEventListener("click", nextPage);
// searchForm.addEventListener("click", previousPage);

function fetchResults(e) {
  console.log(e);
  e.preventDefault();
  url = `${baseUrl}?api-key=${key}&q=${searchDate.value}`;
  console.log("URL:", url);

  if (searchDate.value !== " ") {
    console.log(searchDate.value);
    url += "&date=" + searchDate.value;
  }

  fetch(url)
    .then(function (result) {
      console.log(result);
      return result.json();
    })
    .then(function (json) {
      console.log(json);
      displayResults(json);
    });
}

function displayResults(json) {
  while (section.firstChild) [section.removeChild(section.firstChild)];

  //   let nasa = json.response.docs;

  if (nasa.length === 0) {
    console.log("No Results");
  } else {
    for (let n = 0; n < nasa.length; n++) {
      let article = document.createElement("article");
      let heading = document.createElement("h2");
      let link = document.createElement("a");
      let para = document.createElement("p");
      let clearfix = document.createElement("div");

      let current = nasa[n];
      console.log("Current:", current);

      link.href = current.web_url;
      console.log(link);
      link.textContent = current.headline.main;

      para.textContent = "Keywords: ";

      for (let i = 0; i < current.keywords.length; i++) {
        let span = document.createElement("span");
        span.textContent += current.keywords[i].value + " ";
        para.appendChild(span);
      }

      clearfix.setAttribute("class", "clearfix");
    }
  }

  if (nasa.length === 10) {
    nav.style.display = "block";
  } else {
    nav.style.display = "none";
  }
}
