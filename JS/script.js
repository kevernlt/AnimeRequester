import { CONFIG } from './config.js';

const API_KEY1 = CONFIG.API_KEY1;
const API_KEY2 = CONFIG.API_KEY2;
const API_KEY3 = CONFIG.API_KEY3;

let title = "Overflow";
let size = 10;
const url = `https://anime-db.p.rapidapi.com/anime?search=${title}&page=1&size=${size}`;
const urlGenre = `https://anime-db.p.rapidapi.com/anime?genres=Hentai&page=1&size=100`;
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': API_KEY3,
		'x-rapidapi-host': 'anime-db.p.rapidapi.com'
	}
};

let res = await recherche(url,options);

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