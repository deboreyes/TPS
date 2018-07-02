var service=require("../services/dogsService");
var self={};

//imagenes sin filtro render
self.getImages=function(req,res){
    let result=service.getImages("all",1);
    res.render('dogs', {result});
}

//imagenes sin filtro paginacion json
self.getImagesPage=function(req,res){
    let result=service.getImages("all",req.params.page);
    res.json({"array":result.imgsArray});
}

//filtro
self.filter=function(req,res,next){
    let result=service.getImages("filter",req.params.page,req.body);
    res.json({"array":result.imgsArray,"total": result.total});
}

// filtro favoritos
self.favoritesAll=function(req,res,next){
    let result=service.getImages("fav",1);
    res.render('favs',{result});
}

//paginacion favoritos
self.favoritesPage=function(req,res,next){
    let result=service.getImages("fav",req.params.page);
    res.json({"array":result.imgsArray,"total": result.total});
}

module.exports=self;



