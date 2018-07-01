var service=require("../services/dogService");
var self={};

//imagen seleccionada
self.getImage=function(req,res,next){
    let img=service.getImage(req.params.id);
    res.render('dog', {img});
}

module.exports=self;

