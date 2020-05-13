const baseUrl = "https://eonet.sci.gsfc.nasa.gov/api/v3/events?";
const key = "W3ic4GJkvIT9VcudyjfjIJ2hjquaAqDyOdTKwYxy";
let url;

const startDate = document.querySelector(".start-date");
const endDate = document.querySelector(".end-date");
const searchForm = document.querySelector("form");
const submitBtn = document.querySelector(".submit");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const nav = document.querySelector("nav");
const section = document.querySelector("section");

// nav.style.display = "none";

let pageNumber = 0;
let displanav = false;
console.log("PageNumber", pageNumber);

searchForm.addEventListener("submit", fetchResults);
// nextBtn.addEventListener("click", nextPage);
// prevBtn.addEventListener("click", previousPage);
startDate.addEventListener("input", startDateInfo);
endDate.addEventListener("input", endDateInfo);

function fetchResults(e) {
  //   console.log(e);
  console.log(pageNumber);
  e.preventDefault();
  url = `${baseUrl}?api-key=${key}&page=${pageNumber}`;
  console.log("URL:", url);

  if (startDate.value !== "") {
    console.log(startDate.value);
    url += "&start=" + startDate.value;
  }

  if (endDate.value !== "") {
    console.log(endDate.value);
    url += "&end=" + endDate.value;
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
  while (section.firstChild) {
    section.removeChild(section.firstChild);
  }

  let nasa = json.events;

  console.log(nasa);

  if (nasa.length === 0) {
    console.log("No Results");
  } else {
    for (let n = 0; n < nasa.length; n++) {
      let geoNasa = nasa[n].geometry;

      let id = document.createElement("article");
      let title = document.createElement("h2");
      let link = document.createElement("a");
      let sources = document.createElement("div");
      let clearfix = document.createElement("div");

      let current = nasa[n];
      console.log("Current:", current);

      link.href = current.link;
      console.log((link.target = "_blank"));
      link.textContent = current.link;

      title.innerText = current.title;

      for (const dataSet of geoNasa) {
        console.log(dataSet);
        let magUnit = document.createElement("p");
        let magValue = document.createElement("p");
        magUnit.innerText = dataSet.magnitudeUnit;
        magValue.innerText = dataSet.magnitudeValue;

        sources.appendChild(magUnit);
        sources.appendChild(magValue);
      }
      clearfix.setAttribute("class", "clearfix");
      id.appendChild(title);
      id.appendChild(link);
      //   id.appendChild(mag);
      id.appendChild(sources);
      id.appendChild(clearfix);
      section.appendChild(id);
    }
  }

  //   if (nasa.length === 10) {
  //     nav.style.display = "block";
  //   } else {
  //     nav.style.display = "none";
  //   }
}

// function nextPage(e) {
//   pageNumber++;
//   fetchResults(e);
//   console.log("Page Number:", pageNumber);
// }

// function previousPage(e) {
//   if (pageNumber > 0) {
//     pageNumber--;
//     fetchResults(e);
//   } else {
//     return;
//   }
//   fetchResults(e);
//   console.log("Page:", pageNumber);
// }
