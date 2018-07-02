var data = require('./data');
var self = {};
var items = 3;
var filterArray;
var favsArray = [];

//recibe la categoria de imagenes(todas, filtro o favoritas) y retorna un array  de 3 imagenes
self.getImages = function (imagesArray, page = 1, body) {
	let array;
	// si imagesArray=filter-> si vino por post() hay body y hago el filtro(filt()) si no hay body es la paginacion y uso el array filter que ya existe 
	if (imagesArray == 'filter') array = Object.keys(body).length != 0 ? this.filt(body) : filterArray;
	//si imagesArray=fav-> si el parametro es 1 llamo a favorite para armar el array de favoritos, sino es la paginacion, ya existe y lo uso
	else if (imagesArray == 'fav') array = page == 1 ? this.favorite() : favsArray;
	else array = data.imgs;//si imgsArray=all->uso el array de imagenes original

	let total = Math.ceil(array.length / items);//para la paginacion
	index = (page - 1) * items;//a partir de que numero corto el array

	if (array.length) return { ...data, imgsArray: array.slice(index, index + items), total }
	else return { ...data, message: "No se encontraron resultados para la búsqueda" }
}

//filtro
self.filt = function (body) {
	filterArray = data.imgs.slice(0);
	for (let prop in body) if (body[prop] != "Todos") filterArray = filterArray.filter(img => img[prop] == body[prop]);
	return filterArray;
}

//filtrar favoritos
self.favorite = function () {
	favsArray = data.imgs.slice(0);
	favsArray = favsArray.filter(img => img.fav == true);
	return favsArray;
}

module.exports = self;
