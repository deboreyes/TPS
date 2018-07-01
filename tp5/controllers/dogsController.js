var service=require("../services/dogsService");
var self={};

//imagenes sin filtro
self.getImages=function(req,res){
    let result=service.getImages("all",1);
    res.render('dogs', {result,total:result.total  });
}

//imagenes sin filtro paginacion(render ajax)
self.getImagesPage=function(req,res){
    let result=service.getImages("all",req.params.page);
    res.render('ajax', {result,total:result.total});
}

//filtro
self.filter=function(req,res,next){
    let result=service.getImages("filter",req.params.page,req.body);
    res.render('ajax', {result,totalFilter:result.total});
}

// filtro favoritos
self.favoritesAll=function(req,res,next){
    let result=service.getImages("fav",1);
    res.render('favs', {result,totalFav:result.total});
}

//paginacion favoritos(render ajax)
self.favoritesPage=function(req,res,next){
    let result=service.getImages("fav",req.params.page);
    res.render('ajaxFav', {result,totalFav:result.total});
}

module.exports=self;



