// ****** LocalStorage ******
function UpdateLocalStorage(variableName, data) {
    localStorage.setItem(variableName, JSON.stringify(data))
}


function DeleteLocalStorage(variableName) {
    localStorage.removeItem(variableName)
}


function UpdateLocalStorage_1p(item, key, newValue) {

    // Obtiene los datos del LocalStorage
    let Item_Text = localStorage.getItem(item)

    // Los convierte en objeto
    Item_Object = JSON.parse(Item_Text)

    // Actualiza el valor
    Item_Object[key] = newValue

    // Lo vuelve a subir al localStorage
    UpdateLocalStorage(item, Item_Object)
}

function getLS(item) {
    return JSON.parse(localStorage.getItem(item))
}


// ****** Alerts ******
function customAlert(mensaje, time = 2500) {
    $("#customAlert .msg").html(mensaje)
    $("#customAlert").show('fade')
    setTimeout(function() { closeAlert() }, time);
}


function closeAlert() {
    $("#customAlert").hide('fade')
}


// ****** Array ******
function removeItemFromArr(arr, item) {
    var i = arr.indexOf(item);
    if (i !== -1) arr.splice(i, 1)
}


// ****** Fechas ******
var DATE_TODAY = new Date().toJSON().slice(0, 10)


// ****** Formularios ******
const ClearForm = (idForm) => $(`#${idForm}`).trigger('reset')


// ****** Manipulación de cadenas ******
const capFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1)