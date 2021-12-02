const API_KEY = "cf88868e-512f-4ab6-a013-8b8bac1ec5f1"; 
const API_UTL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

getMovies(API_UTL_POPULAR);
async function getMovies(url) {
    const resp = await fetch(url, {
        headers: { 
            "Content-Type" : "application/json",
            "X-API-KEY": API_KEY,
        }
    });
    const respData = await resp.json();
    showMovies(respData);
};

function getClassByRate(vote) {
    if (vote >= 7) {
        return "green";
    } else if (vote > 6) {
        return "orange";
    } else {
        return "red";
    }
}

function showMovies(data) {
    const moviesEl = document.querySelector(".movies");

    document.querySelector(".movies").innerHTML = "";
    
    data.films.forEach(movie => {
        
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie"); 
        movieEl.innerHTML = `
         <div class="movie__cover-inner">
                    <img src="${movie.posterUrlPreview}" alt="${movie.nameRu}" class="movie__poster">
                    <div class="movie__cover-dark"></div>
                </div>
                <div class="movie__info">
                    <div class="movie__info-title">${movie.nameRu}</div>
                    <div class="movie__info-category">${movie.genres.slice(0,2).map(genre => ` ${genre.genre}`)}
                    </div>                                                             
                    ${movie.rating.includes('%') ? `<div class="movie__info-waiting">${movie.rating.split('.')[0]+"%"}</div>` :  
                    movie.rating == 0 || movie.rating == 'null' ? "" : `<div class="movie__info-rating movie__info-${getClassByRate(movie.rating)}">${movie.rating}</div>`}      
                </div> 
        `;
        moviesEl.appendChild(movieEl);
    });
}

const form = document.querySelector("form");
const search = document.querySelector(".search__input");

form.addEventListener("submit", e => {
    e.preventDefault();

    const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
    if (search.value) {
        getMovies(apiSearchUrl);
        document.querySelector(".search__result").innerHTML = "<p>Результаты поиска по запросу:</p>&nbsp"  + search.value + `<a onclick="location.reload()"><img src="img/cross.svg" class="cross-search"/></a>`; 
        search.value = "";
    }
})