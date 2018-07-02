var data = require('./data');
var self = {};

//agregar o quitar favorito
self.fav = function (body) {
	let img = data.imgs.find(img => img.id == JSON.parse(body.id));
	img.fav = JSON.parse(body.newFav);
}

module.exports = self;