//DOM elements
const searchButton = document.getElementById("searchBtn");
const eraseButton = document.getElementById("eraseBtn");
const searchField = document.getElementById("param");
const searchType = document.getElementById("search-type");
const resultBoard = document.getElementById("resultBoard");
const genre = document.getElementById("genre");

//let variables
let actualPage = 0;
let nextPage = false;
let searchContent;
let searchTypeActual;
let nbResult;
let totalResult;

//fetcher options
const options = {
	headers: {
		Accept: 'application/json'
	}
};

// search by genre
searchType.addEventListener("change", function () {
    if (searchType.value === "gender") {
        // by genre
        searchField.hidden = true;
        genre.hidden = false;
        searchField.required = false;
        genre.required = true;
		optionGenres();
    } else {
        // by title
        searchField.hidden = false;
        genre.hidden = true;
        searchField.required = true;
        genre.required = false;
    }
});

//alt information in console
function afficheMeta(res){
	console.log(res.meta);
}

//result of the search in console
function afficheRes(res){
	res.data.forEach(element=>{
		console.log(element);
	});
}

//search function
async function recherche(url,options){
	try{
		const response = await fetch(url, options);
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
}

//genre-search function 
async function rechercheParGenre(genre, page){
    const urlGenre = `https://api.tenrai.org/v1/anime?page=${page}&limit=10&genres=${genre}`;
	console.log(urlGenre);
    let res= await recherche(urlGenre, options);
    return res;
}

//title-search function
async function rechercheParTitre(titre, page){
    const urlTitre = `https://api.tenrai.org/v1/anime?q=${titre}&page=${page}&limit=10`;
    console.log(urlTitre);
    let res= await recherche(urlTitre, options);
    return res;
}

//get list of genres
async function getGenres(){
	const urlGenre = 'https://api.tenrai.org/v1/genres/anime';
	const res = await recherche(urlGenre,options);
	console.log(res);
	return res.data;
}

//add genres options
async function optionGenres() {
	const res = await getGenres();
	let txt;
	res.forEach(element=>{
		txt+=`<option value="${element.mal_id}">${element.name}</option>`
	})
	genre.innerHTML+=txt;
}

//searching function
async function search (e){
	e.preventDefault();
	clearBoard();
	searchTypeActual = searchType.value;
	let res;
	if(searchTypeActual == "title"){
		searchContent = searchField.value;
		res= await rechercheParTitre(searchContent, 1);
	} else{
		searchContent = genre.value;
		res= await rechercheParGenre(searchContent, 1);
		if(!res)return badParam();
	}
	console.log(res);
	if(res.pagination.items.total == 0)return noResult();
	res.data.forEach(element=>{
		createResult(element);
	});
	actualPage = res.pagination.current_page;
	nextPage = res.pagination.has_next_page;
	nbResult = res.pagination.current_page * res.pagination.items.per_page;
	totalResult = res.pagination.items.total;
	needLoadMore();
}

//search function whitout clearing precedent result
async function searchNoClear(e,page){
	e.preventDefault();
	let res;
	if(searchTypeActual == "title"){
		res= await rechercheParTitre(searchContent, page);
	} else {
		res= await rechercheParGenre(searchContent, page);
		if(!res)return badParam();
	}
	console.log(res);
	if(res.pagination.items.total == 0)return noResult();
	res.data.forEach(element=>{
		createResult(element);
	});
	actualPage = res.pagination.current_page;
	nextPage = res.pagination.has_next_page;
	nbResult = page * res.pagination.items.per_page;
	needLoadMore();
}

//handle no result error
function noResult(){
	const err = document.createElement("div");
	err.classList.add("error");
	err.innerHTML = `Aucun résultat.`;
	resultBoard.appendChild(err);
}

//handle bad parameters error
function badParam(){
	const err = document.createElement("div");
	err.classList.add("error");
	err.innerHTML = `Ce genre n'existe pas.`;
	resultBoard.appendChild(err);
}

//creating the card result
function createResult(anime){
	const resultCard = document.createElement("div");
	resultCard.classList.add("result-card");
	resultCard.innerHTML = `
		<h2 class="anime-title">${anime.title}</h2>
		<img src="${anime.images.jpg.image_url}" alt="${anime.images.jpg.image_url}">
		<div class="anime-details">
		<p class="synopsis-text"><strong>Synopsis :</strong> ${anime.synopsis}</p>
		<p class="anime-info-line"><strong>Genre :</strong> ${anime.genres.map(g=>g.name).join(', ')}</p>
		<p class="anime-info-line"><strong>Classement :</strong> ${anime.rank}</p>
		<p class="anime-info-line"><strong>Nombre d'épisodes :</strong> ${anime.episodes}</p>
		<a href="${anime.url}" class="btn MALBtn" target="_blank" rel="noopener noreferrer">Voir sur <img src="MALIcon.svg" alt="MyAnimeList"></a>
		</div>
	`;
	resultBoard.appendChild(resultCard);
}

//Load more button for multiple result
function needLoadMore(){
	if(nextPage){
		const buttonLoad = document.createElement("input");
		buttonLoad.classList.add("btn");
		buttonLoad.type = "submit";
		buttonLoad.id = "loadBtn";
		buttonLoad.value = `Charger plus (${nbResult} sur ${totalResult})`;
		buttonLoad.addEventListener("click", async (e) => {buttonLoad.remove();await searchNoClear(e,++actualPage);});
		resultBoard.appendChild(buttonLoad);
	}
}

//initializing the buttons
function initButtons(){
	searchButton.addEventListener("click", async (e) => search(e));
}

//clearing board
function clearBoard(){
	resultBoard.innerHTML = "";
}

initButtons();