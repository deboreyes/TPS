//la primera vez que carga la pagina
$("#page1").addClass("active");

//-----------------------------filtro/reset-----------------------------------
//requiero imagenes con los valores de los selects
function post() {
    $.post($('form').attr('action'), $('form').serialize(), (resp) => {
        $('.imgsContainer').html(resp);
        $("#page1").addClass("active");
    });
}

//filtro
$('form').on('submit', () => {
    let selects = $("select");
    if (selects[0].value != "Todos" || selects[1].value != "Todos" || selects[2].value != "Todos") {
        post();
    }
    return false;
});

//limpiar filtro
$(document).on("click", "#clean", () => {
    let selects = $("select");
    if (selects[0].value != "Todos" || selects[1].value != "Todos" || selects[2].value != "Todos") {
        $("form").trigger("reset");
        post();
    }
})

//------------------------------paginado--------------------------------------
//get con la pagina requerida
function getPage(page) {//$(selector).load(URL,data,callback);
    if (page.href) $('.imgsContainer').load(page.href, () => { $("#" + page.id).addClass("active") });
}

//seleccionar pagina
$(document).on('click', '.pages', (e) => {
    e.preventDefault();
    getPage(e.target);
});

//anterior y siguiente
$(document).on('click', 'span', (e) => {//llamo a getPage() con el href del elemento siguiente o anterior
    e.currentTarget.id == "next" ? getPage($(".pages.active").parent().next().children()[0]) : getPage($(".pages.active").parent().prev().children()[0]);
})

//-------------------------------favoritos-----------------------------------------
//agregar o quitar favorito
$(document).on("click", ".heart", function () {
    $(this).toggleClass("fav");
    $.ajax({
        type: "PUT",
        url: "http://localhost:3000",
        data: {
            id: $(this).attr("id"),
            newFav: $(this).hasClass("fav") ? true : false
        }
    })
});



