function onChangeCurrency(element) {

    // Actualiza la variable global de moneda
    let temp_currency = $(element).children("option:selected").val();
    CURRENCY = COUNTRY_CURRENCY.find(element => element.Currency == temp_currency)

    // Actualiza la configuración del usuario
    updateUserCurrency()

    // Actualiza los precios del DOM
    DOM_updatePrice()
}

function DOM_updatePrice() {

    // Actualiza precio
    $(".price").each(function(key, element) {
        let CalculatePrice = convCurrency($(this).attr("data-price"))

        // Animación al mostrar nuevo precio
        $(this).fadeOut('slow', function() {
            $(this).html(CalculatePrice)
        }).slideDown('slow')
    });

    // Actualiza simbolo de moneda
    $(".curr_Simbol").fadeOut('slow', function() {
        $(".curr_Simbol").html(CURRENCY.Symbol)
    }).slideDown('slow')
}

function DOM_setCurrencyOptions() {

    let html = COUNTRY_CURRENCY.map((currency) =>
        `<option value="${currency.Currency}">${currency.Symbol} - ${currency.Description}</option>`
    ).join("")

    $("#selCurrency").html(html)
}