$(document).ready(function() {

    // CONTROL DE USUARIO
    var user = getLS("loggedUser");
    toggleLogin(user)


    // DATOS DE SIMULACIÓN
    // Inventa una cantidad de usuarios registrados
    localStorage.setItem("TotalUsers", 293)


    // CARGA DE DATOS
    // --> Carga lo referido da moneda y conversión
    $.getJSON("./db/currency.json", function(data) {
        COUNTRY_CURRENCY = data
        DOM_setCurrencyOptions()
        getExRates().then(getUserCurrency)
    })

    // --> Carga la información de los cursos
    getCourses().then(convCourseToClass).then(DOM_generateCourses)

});
