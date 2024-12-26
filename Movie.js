const KEY = "8bff636";

const API_URL = `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}`;
const IMG_PATH = `http://img.omdbapi.com/?apikey=${KEY}&`;
const SEARCH_API = `http://www.omdbapi.com/?apikey=${KEY}&s=`;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const getClassByRate = (vote) => {
  if (vote >= 7.5) return "green";
  else if (vote >= 6) return "orange";
  else return "red";
};

const showMovies = (movies) => {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { Title: title, Poster: poster_path, imdbRating: vote_average, Plot: overview } = movie;
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");
    movieElement.innerHTML = `
      <img
        src="${poster_path !== "N/A" ? poster_path : "https://via.placeholder.com/200"}"
        alt="${title}"
      />
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average || 0)}">${vote_average || "N/A"}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        ${overview || "No overview available."}
      </div>
    `;
    main.appendChild(movieElement);
  });
};

const getMovies = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data.Search || []);
};

getMovies(API_URL);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);
    search.value = "";
  } else history.go(0);
});
