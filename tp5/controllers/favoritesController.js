var service=require("../services/favoritesService");
var self={};

//agregar o sacar favorito
self.fav=function(req,res,next){
    service.fav(req.body);
    res.end();
}

module.exports=self;

