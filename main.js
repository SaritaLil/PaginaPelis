let idGeneroAntes;

function getMovies(idGenero) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    let url = "http://api.themoviedb.org/3/discover/movie?api_key=8ec4737a2c5c5aac08768ef2f24735b7&language=es";
    if (idGenero) {
        url += "&with_genres=" + idGenero;
        let genId = "gen-" + idGenero;
        document.getElementById(genId).classList.add("bg-sky-500", "text-white");

        if (idGeneroAntes) {
            let idAntes = "gen-" + idGeneroAntes;
            document.getElementById(idAntes).classList.remove("bg-sky-500", "text-white");
        }

        idGeneroAntes = idGenero
    }
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
            document.getElementById("pelis").innerHTML = "";
            for (const peli of result.results) {
                document.getElementById("pelis").innerHTML += `<div class="bg-white rounded-md shadow-lg">
<img class="h-[320px] w-full object-cover rounded-t-md"
    src="https://image.tmdb.org/t/p/w500${peli.poster_path} " alt="">
<div class="p-4">
    <a class="text-slate-800 font-semibold hover:text-blue-600/75" href="http://google.com">${peli.title} </a>
    <p class="text-slate-800">${peli.release_date}</p>
</div>`
            }
        })
        .catch(error => console.log('error', error));
}

getMovies();

function getGenres() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=8ec4737a2c5c5aac08768ef2f24735b7&language=es", requestOptions)
        .then(response => response.json())
        .then((result) => {
            for (const genre of result.genres) {
                document.getElementById("generos").innerHTML += `<button id="gen-${genre.id}" onclick="getMovies(${genre.id})" 
                class="py-1 px-3 m-1 border border-slate-300 rounded-full hover:bg-sky-500 hover:text-white">${genre.name} </button>`
            }
        })
        .catch(error => console.log('error', error));

}


getGenres();