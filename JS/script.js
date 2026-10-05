import { CONFIG } from './config.js';

const API_KEY1 = CONFIG.API_KEY1;
const API_KEY2 = CONFIG.API_KEY2;
const API_KEY3 = CONFIG.API_KEY3;

const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': API_KEY3,
		'x-rapidapi-host': 'anime-db.p.rapidapi.com'
	}
};

let res = await rechercheParTitre("Overflow", 10);

afficheRes(res);
afficheMeta(res);

function afficheMeta(res){
	console.log(res.meta);
}

function afficheRes(res){
	res.data.forEach(element=>{
		console.log(element);
	});
}

async function recherche(url,options){
	try{
		const response = await fetch(url, options);
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
}

async function rechercheParGenre(genre, size){
    const urlGenre = `https://anime-db.p.rapidapi.com/anime?genres=${genre}&page=1&size=${size}`;
    res= await recherche(urlGenre, options);
    afficheRes(res);
}

async function rechercheParTitre(titre, size){
    const urlTitre = `https://anime-db.p.rapidapi.com/anime?search=${titre}&page=1&size=${size}`;
    res= await recherche(urlTitre, options);
    afficheRes(res);
}