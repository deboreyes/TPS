var playerName;
var level;
var cardsArray=[];
var ready=true;
var round;
var firstCard={};
var secondCard={};
var count;
var correct;
var score;
var winnersArray=[];

var winnersStorage=JSON.parse(localStorage.getItem("winners"));
if(winnersStorage){
    winnersArray=winnersStorage.winners
}

$("#name").focus();
$("#gameContainer").hide()

//valida que el campo name esté completo
function validate(){
    playerName=$("#name").val().toUpperCase();
    level=$("#selectLevel").val();
    if(playerName){
        if(level!=0){
            resetGame();
            return true;
        }else{
            alert("Seleccione un nivel"); 
        }
    }
    else{    
        alert("Complete su nombre"); 
    }
}

//inicializa las variables para comenzar el juego
function resetGame(){
    round=0;
    count=0;  
    correct=0;
    score=0;
    completeArray();
    shuffle();
    showGame();
}

//agrega al array los elementos para que haya 2 iguales de cada uno
function completeArray(){
    cardsArray=["imgs/1.png","imgs/2.png","imgs/3.png","imgs/4.png","imgs/5.png","imgs/6.png"];
    $(cardsArray).each(function(index,element){
        cardsArray.push(element);
    });
}

//desordena el array que contiene las rutas de las imagenes
function shuffle(){    
    $(cardsArray).each(function(index,element){  
        randomIndex = Math.floor(Math.random()*cardsArray.length);
        temporary = cardsArray[index];
        cardsArray[index] = cardsArray[randomIndex];
        cardsArray[randomIndex] = temporary;
    })
}

//crea dinamicamente las imagenes con cada elemento del array como ruta y las gira
function showGame(){
    $("#game").empty();
    $("#round").html("");
    $("#score").html("");
    $(cardsArray).each(function(index,element){    
        var cardContainer=`<div class="cardContainer"></div>`;
        var backCard=`<img src="imgs/card.png" class="back" data-id="${index}">`;
        var frontCard=`<img src="${element}" class="front" id="${index}">`;
        $("#game").append($(cardContainer).append(backCard,frontCard));
        rotate(index,"0","180" );
    }); 
    $("#game").append(`<div id="divWin"><h2>GANASTE!</h2><p>MEJORES PUNTAJES</p><ul></ul></div>`);
    $("#game").append(`<div id="divGameOver"><h2>PERDISTE</h2></div>`);
}

//rota cada carta segun los parametros
function rotate(id, backDeg, frontDeg){
    $("[data-id="+id+"]").css("transform", "rotateY("+backDeg+"deg)");
    $("#"+id).css("transform", "rotateY("+frontDeg+"deg)"); 
}

//rota la carta y guarda los datos en en el objeto first o second segun la vuelta 
$(document).on("click",".back",function(){
    if(ready==true&&round<level){
        var id=$(this).data("id"); 
        rotate(id, "-180", "0")
        if(count%2==0){//si es par es la primer carta de cada vuelta
            firstCard.id=id;
            firstCard.src=$("#"+id).attr("src");
        }
        else{
            secondCard.id=id;
            secondCard.src=$("#"+id).attr("src");
            round++;
            $("#round").html(round+"/"+level);
            compare();          
        }
        count++;
    } 
})

function compare(){
    ready=false;//para que no pueda dar vuelta otra carta
    //si el atributo src del objeto que corresponde a la primer y segunda carta coinciden suma una correcta y calcula el score
    setTimeout(function(){ //espero para que no se muevan las cartas antes de que esten las 2 de frente
        if(firstCard.src==secondCard.src){
            correct++;
            score+=200-round*10;
            $("#score").html(score);
            $("#"+firstCard.id).effect("shake",{times:2,distance:9,direction:"up"});
            $("#"+secondCard.id).effect("shake",{times:2,distance:9,direction:"up"});
            ready=true;
        }
        else{
            //gira las 2 cartas referenciadas en los objetos
            $("#"+firstCard.id).effect("shake",{distance:10});
            $("#"+secondCard.id).effect("shake",{distance:10});  
            setTimeout(function(){
                rotate(firstCard.id,"0","180");
                rotate(secondCard.id,"0","180");
                ready=true;//cuando termina de girar pone ready en true para habilitar la seleccion de otra carta
            },500); 
        } 
        endGame(); 
    },500); 
}

function endGame(){
    if(correct==6){//si acerto todas las cartas
        newWinner();//cargo un nuevo ganador
        $("#divWin").css("display","flex");
    }else if(correct<6 && round==level){//si llego a la vuelta 24 y no acerto todas las cartas
        $("#divGameOver").css("display","flex");
    }
}

function newWinner(){
    $("ul").empty();
    winnersArray.push({"playerName":playerName, "score":score});
    winnersArray.sort(function(a, b) {//ordeno los objetos del array winners por score
        return b.score - a.score;
    });
    winnersArray.splice(3,1)//cuando el array tiene mas de 3 elementos muestro los 3 mejores y elimino el ultimo
    localStorage.setItem("winners",JSON.stringify({winners:winnersArray}))
    $.each(winnersArray,function(index,elem){
        $("ul").append(`<li>${elem.playerName} ${elem.score}</li>`);	
    });   
}

//llama a validar y si devuelve true muestra el contenedor game y oculta el principal
function scroll (){
    if(validate()){
        $("#gameContainer").show();
        $("body").css("overflow","hidden");
        $('html, body').animate({
            scrollTop: $("#gameContainer").offset().top
        }, 1500);
        setTimeout(function(){ 
            $("#new").hide();   
            $("body").css("overflow","auto");
        }, 1500);
    }
};

$('#newGameBtn').on('click', function() {
    scroll();//llama a validar y mostrar
});

$("input, select").on("keypress",function(e) {
    if (e.keyCode == 13) { 
        e.preventDefault();//para que el select no despliegue las opciones
        scroll();//llama a validar y mostrar cuando la tecla presionada es enter y esta el foco en el input name o el select
    }
});

//muestra la pantalla principal
$("#resetGameBtn").on("click",function(){
    $("#gameContainer").hide();
    $("#new").show();    
    $("#name").focus();
    $("#selectLevel").val("0");
});

$("#name").focus(function(){	   
    this.select();//cuando el input tiene el foco selecciona el texto
});

//ajusta el tamaño de los contenedores segun el parametro
function resizeContainers(heightValue){
    $("#new").css("height",heightValue+"px");
    $("#gameContainer").css("height",heightValue+"px");
}

//al cambiar el tamaño de la ventana llama a resizeContainers
$(window).resize(function(){
    resizeContainers($(window).height());
});

//llama a resizeContainers con el tamaño inicial de la ventana
resizeContainers($(window).height()); 