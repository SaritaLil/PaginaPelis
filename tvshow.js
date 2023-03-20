let idGeneroAntes;
let idProviderAntes;

function getTVShow(idGenero, idProvider) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    let url = "https://api.themoviedb.org/3/discover/tv?api_key=8ec4737a2c5c5aac08768ef2f24735b7&language=es-ES&watch_region=ES";
    if (idGenero) {
        url += "&with_genres=" + idGenero;

        if (idGenero != idGeneroAntes) {
            let genId = "gen-" + idGenero;
            document.getElementById(genId).classList.add("bg-sky-500", "text-white");

            if (idGeneroAntes) {
                let idAntes = "gen-" + idGeneroAntes;
                document.getElementById(idAntes).classList.remove("bg-sky-500", "text-white");
            }

            idGeneroAntes = idGenero

        }
        getWatchProviders();
    }

    if (idProvider) {
        url += "&with_watch_providers=" + idProvider;

        if (idProvider != idProviderAntes) {
            let provId = "prov-" + idProvider;
            document.getElementById(provId).classList.add("border-4", "border-sky-500", "bg-sky-500");

            if (idProviderAntes) {
                let idProvAntes = "prov-" + idProviderAntes;
                document.getElementById(idProvAntes).classList.remove("border-4", "border-sky-500", "bg-sky-500");
            }

            idProviderAntes = idProvider

        }
        getGenres();
    }


    fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
            document.getElementById("programas").innerHTML = "";
            for (const show of result.results) {
                document.getElementById("programas").innerHTML += `<div class="bg-white rounded-md shadow-lg">
<img class="h-[320px] w-full object-cover rounded-t-md"
    src="https://image.tmdb.org/t/p/w500${show.poster_path} " alt="">
<div class="p-4">
    <a class="text-slate-800 font-semibold hover:text-blue-600/75" href="http://google.com">${show.name} </a>
    <p class="text-slate-800">${show.first_air_date}</p>
</div>`
            }
        })
        .catch(error => console.log('error', error));
}

getTVShow();

function getGenres() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://api.themoviedb.org/3/genre/tv/list?api_key=8ec4737a2c5c5aac08768ef2f24735b7&language=es-ES\n&with_genre", requestOptions)
        .then(response => response.json())
        .then((result) => {
            document.getElementById("generos").innerHTML = "";
            for (const genre of result.genres) {
                if (genre.id == idGeneroAntes) {
                    document.getElementById("generos").innerHTML += `<button id="gen-${genre.id}" onclick="getTVShow(${genre.id}, ${idProviderAntes})" 
                class="py-1 px-3 m-1 border border-slate-300 rounded-full bg-sky-500 text-white hover:bg-sky-500 hover:text-white">${genre.name} </button>`
                } else {
                    document.getElementById("generos").innerHTML += `<button id="gen-${genre.id}" onclick="getTVShow(${genre.id}, ${idProviderAntes})" 
                class="py-1 px-3 m-1 border border-slate-300 rounded-full hover:bg-sky-500 hover:text-white">${genre.name} </button>`
                }
            }
        })
        .catch(error => console.log('error', error));

}


getGenres();

function verMenu() {
    document.getElementById("menu2").classList.toggle("hidden");
}

function getWatchProviders() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://api.themoviedb.org/3/watch/providers/tv?api_key=8ec4737a2c5c5aac08768ef2f24735b7&language=es-ES&watch_region=ES", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            document.getElementById("provider").innerHTML = "";
            for (const provider of result.results) {
                if (provider.provider_id == idProviderAntes) {
                    document.getElementById("provider").innerHTML += `<button id="prov-${provider.provider_id}" onclick="getTVShow(${idGeneroAntes}, ${provider.provider_id})" class="border m-1 rounded-lg">
      <img class="w-12 h-12 rounded-lg border-4 border-sky-500 bg-sky-500" src="https://www.themoviedb.org/t/p/original/${provider.logo_path}" alt="">
  </button>`;
                } else {
                    document.getElementById("provider").innerHTML += `<button id="prov-${provider.provider_id}" onclick="getTVShow(${idGeneroAntes}, ${provider.provider_id})" class="border m-1 rounded-lg">
      <img class="w-12 h-12 rounded-lg" src="https://www.themoviedb.org/t/p/original/${provider.logo_path}" alt="">
  </button>`;
                }
            }
        })

        .catch(error => console.log('error', error));
}

getWatchProviders();