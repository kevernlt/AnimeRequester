/*const url = 'https://anime-db.p.rapidapi.com/genre';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'd99caf32bbmshd86e3af71c07ab6p1671a7jsn1f9b2353e1d8',
		'x-rapidapi-host': 'anime-db.p.rapidapi.com'
	}
};

let result;

try {
	const response = await fetch(url, options);
	result = await response.json();
	//console.log(result[0].id);
} catch (error) {
	console.error(error);
}
result.forEach(element => {
    console.log(element.id);
});*/

const url2 = 'https://anime-db.p.rapidapi.com/anime?search=gundam&page=1&size=100';
const options2 = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'd99caf32bbmshd86e3af71c07ab6p1671a7jsn1f9b2353e1d8',
		'x-rapidapi-host': 'anime-db.p.rapidapi.com'
	}
};

let result;

try {
	const response = await fetch(url2, options2);
	result = await response.json();
	//console.log(result.data[0].synopsis);
} catch (error) {
	console.error(error);
}

result.data.forEach(element => {
    console.log(element.title);    
});