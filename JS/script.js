//DOM elements
const searchButton = document.getElementById("searchBtn");
const eraseButton = document.getElementById("eraseBtn");
const searchField = document.getElementById("param");
const searchType = document.getElementById("search-type");
const resultBoard = document.getElementById("resultBoard");


//fetcher options
const options = {
	headers: {
		Accept: 'application/json'
	}
};

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
async function rechercheParGenre(genre, size){
	const param = await getIdByName(genre);
	if(param == null)return false;
    const urlGenre = `https://api.tenrai.org/v1/anime?genres=${await getIdByName(genre)}`;
	console.log(urlGenre);
    let res= await recherche(urlGenre, options);
    return res;
}

// retrieve the ID of the genre
async function getIdByName(genre){
	const res = await getGenres();
	const found = res.find(
		(element) => element.name.toLowerCase() === genre.toLowerCase());
	//console.log(found.mal_id);
	return found?.mal_id ?? null;
}

//title-search function
async function rechercheParTitre(titre, size){
    const urlTitre = `https://api.tenrai.org/v1/anime?q=${titre}`;
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
	const res = getGenres();
	const result = [];
	res.forEach(element =>{
		result.push(element.name);
	})
	let txt;
	result.forEach(element=>{
		txt+=`<option value="${element}">${element}</option>`
	})
	//TODO adding the text at the genre selection
}

//searching function
async function search (e){
	e.preventDefault();
	clearBoard();
	let type = searchType.value;
	let res;
	if(type == "title"){
		res= await rechercheParTitre(searchField.value, 10);
	} else{
		res= await rechercheParGenre(searchField.value, 10);
		if(!res)return badParam();
	}
	console.log(res);
	if(res.pagination.items.total == 0)return noResult();
	res.data.forEach(element=>{
		createResult(element);
	});
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
		</div>
	`;
	resultBoard.appendChild(resultCard);
}

//initializing hte buttons
function initButtons(){
	searchButton.addEventListener("click", async (e) => search(e));
}

//clearing board
function clearBoard(){
	resultBoard.innerHTML = "";
}

initButtons();