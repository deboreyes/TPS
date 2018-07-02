//la primera vez que carga la pagina
$("#page1").addClass("active");

//cambio imagenes
function append(array) {
    $('figure').show();
    let figures = Array.from($("figure"))
    let imgs = Array.from($(".dogImg"))
    array.forEach((element, index) => {
        let figure = figures[index];
        $(imgs[index]).attr("src", "/images/" + element.src + ".jpg")
        let labels = $(figure).find("label");
        labels[0].innerText = element.name;
        labels[1].innerText = "Raza: " + element.breed;
        labels[2].innerText = "Tamaño: " + element.size;
        labels[3].innerText = "Edad: " + element.age;
        let divFav=$(figure).find("div");
        element.fav==true? divFav.addClass("fav"):divFav.removeClass("fav")
        $(figure).attr("id", element.id);
    });
    if (array.length!=3) $( $('figure')[2] ).hide();
    if (array.length==1) $( $('figure')[1] ).hide();
}

//cambio paginacion, cantidad y enlaces
function appendPag(pag, total) {
    $("ul").empty();
    $("ul").append(`<span id="prev"><li><</li></span>`)
    for (let i = 1; i < total + 1; i++) $("ul").append(`<li><a href="/${pag}/${i}" id="page${i}" class="pages">${i}</a></li>`);
    $("ul").append(` <span id="next"><li>></li></span>`)
    $("#page1").addClass("active");
}

//requiero imagenes con los valores de los selects
function post() {
    $.ajax({
        type: "POST",
        url: $('form').attr('action'),
        data: $('form').serialize(),
        success: function (resp) {
            append(resp.array)
            appendPag("filter", resp.total);
        }
    })
}

//filtro
$('form').on('submit', (e) => {
    e.preventDefault();
    post();
});

// limpiar filtro
$(document).on("click", "#clean", () => {
    let selects = $("select");
    if (selects[0].value != "Todos" || selects[1].value != "Todos" || selects[2].value != "Todos") {
        $("form").trigger("reset");
        post();
    }
})

//------------------------------paginado--------------------------------------
//get con la pagina requerida
function getPage(page) {
    if (page.href) {
        $.ajax({
            type: "GET",
            url: page.href,
            success: function (resp) {
                $(".pages").removeClass("active")
                $("#" + page.id).addClass("active")
                append(resp.array)
            }
        })
    }
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
            id: $(this).parents("figure").attr("id"),
            newFav: $(this).hasClass("fav") ? true : false
        }
    })
});
