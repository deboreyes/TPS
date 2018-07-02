var data = require('./data');
var self = {};

//seleccionar una imagen
self.getImage = function (id) {
	let img = data.imgs.find(dog => dog.id == id);
	return img;
}

module.exports = self;
