function DOM_generateCourses() {

    var html = ''
    courses.forEach((element, index) => {
        html +=
            `
        <div class="col-lg-3 col-md-4 portfolio-item filter-${element.category}">
            <div style="text-align: center;">
                <a id="courseItem1" onclick="DOM_setCourseInfo(${index})" class="btn btn-lg btn-dark btn-shadow font-fugas">
                    ${element.name}
                </a>
            </div>
        </div>
        `
    });
    $("#courses").html(html)
}



// Obtiene el detalle del curso seleccionado
function DOM_setCourseInfo(id) {

    // Muestra sección
    $("#detailsCourseSection").show()

    // Actualiza DOM
    $("#courseName").html(courses[id].name)
    $("#courseDescription").html(courses[id].description)
    $(".curr_Simbol").html(CURRENCY.Symbol)
    $("#coursePrice").attr("data-price", courses[id].price)
    $("#coursePrice").html(convCurrency(courses[id].price))
    $("#courseVacAvailable").html(courses[id].vacAvailable)
    $("#courseVacancies").html(courses[id].vacancies)
    $("#courseConditions").html(courses[id].conditions)

    $("#btn_AddToCart").html(`
    <div>
        <a class="btn-get-started text-center" onclick="addItemToCart(${id})">Añadir a carrito </a>
    </div>
    `)

    if (courses[id].ico) $("#courseIco").attr("src", courses[id].ico).show()
    else $("#courseIco").hide()

    // Se direge a la sección
    window.location.href = "#detailsCourseSection";
}