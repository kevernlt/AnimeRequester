//API KEYS public
const API_KEY1 = "d99caf32bbmshd86e3af71c07ab6p1671a7jsn1f9b2353e1d8";
const API_KEY2 = "03e6f1d4b7mshdcf666fa4bcac0cp1ec3eejsncb005a7f349e";
const API_KEY3 = "21cc2e0e88msh1a86a7a3327ed17p10ebd3jsn617fbdb19e48";

//DOM elements
const searchButton = document.getElementById("searchBtn");
const eraseButton = document.getElementById("eraseBtn");
const searchField = document.getElementById("param");
const searchType = document.getElementById("search-type");
const resultBoard = document.getElementById("resultBoard");


//fetcher options
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': API_KEY2,
		'x-rapidapi-host': 'anime-db.p.rapidapi.com'
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
    const urlGenre = `https://anime-db.p.rapidapi.com/anime?genres=${genre}&page=1&size=${size}`;
    let res= await recherche(urlGenre, options);
    return res;
}

//title-search function
async function rechercheParTitre(titre, size){
    const urlTitre = `https://anime-db.p.rapidapi.com/anime?search=${titre}&page=1&size=${size}`;
    let res= await recherche(urlTitre, options);
    return res;
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
	}
	console.log(res);
	res.data.forEach(element=>{
		createResult(element);
	});
}

//creating the card result
function createResult(anime){
	let resultCard = document.createElement("div");
	resultCard.classList.add("result-card");
	resultCard.innerHTML = `
		<h2 class="anime-title">${anime.title}</h2>
		<img src="${anime.image}" alt="${anime.title}">
		<div class="anime-details">
		<p class="synopsis-text"><strong>Synopsis :</strong> ${anime.synopsis}</p>
		<p class="anime-info-line"><strong>Genre :</strong> ${anime.genres.join(", ")}</p>
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

function clearBoard(){
	resultBoard.innerHTML = "";
}

initButtons();