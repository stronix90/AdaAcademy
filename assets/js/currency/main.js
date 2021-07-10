/*   **************************************   */
/*   *******   MONEDA DEL USUARIO   *******   */
/*   **************************************   */


// Si existe, recupera la moneda guardada en datos de usuario
// Si no existe, busca la mejor moneda según IP
// Si todo fracasó, se pone ARS
async function getUserCurrency() {

    let user = getLS("loggedUser") || getLS("temporalSession")

    if (user) localCurr = user.currency
    else {
        let CurrencyByIP = await getCurrencyByIP();
        const MatchedCurrency = COUNTRY_CURRENCY.find(element => element.Currency == CurrencyByIP);
        localCurr = (MatchedCurrency) ? CurrencyByIP : "ARS"
    };

    $("#selCurrency").val(localCurr).change()
}


function getCurrencyByIP() {

    return new Promise((resolve) => {


        $.getScript('http://www.geoplugin.net/javascript.gp')
            .done(function(script, textStatus) {
                Currency = geoplugin_currencyCode();
                resolve(Currency)
            })
            .fail(function(jqxhr, settings, exception) {
                Currency = "USD"
                resolve(Currency)
            });
    })
}


function updateUserCurrency() {

    // Actualiza datos del usuario (Logueado o Invitado)
    let user = localStorage.getItem("loggedUser")

    if (user) UpdateLocalStorage_1p("loggedUser", "currency", CURRENCY.Currency)
    else setTemporalSession()
}



/*   **************************************   */
/*   ******   CONVERSIÓN DE MONEDA   ******   */
/*   **************************************   */

async function getExRates() {

    let Rates

    // Si están disponibles y son vigentes, obtiene las cotizaciones de la memoria
    Rates = getLS("ExRates")

    // Si no, descarga las nuevas cotizaciones
    if (!Rates || Rates.date != DATE_TODAY) {
        Rates = await getExRatesFromAPI();
        UpdateLocalStorage("ExRates", Rates)
    }

    EX_RATES = Rates
}


function getExRatesFromAPI() {

    let base = 'ARS'
    let symbols = COUNTRY_CURRENCY.map((currency) => currency.Currency)
    let string = 'https://api.exchangerate.host/latest?base=' + base + '&symbols=' + symbols

    return new Promise((resolve) => {
        $.getJSON(string, data => resolve(data));
    })
}


function convCurrency(amount) {
    let discountRate = 100

    let conv = EX_RATES.rates[CURRENCY.Currency] || 1
    if (conv != 1) discountRate = 90 // <-- Aquí se pueden establecer tasa de descuento por conversión de moneda

    let newAmount = Math.ceil(amount * conv * discountRate / 100)
    return newAmount
}