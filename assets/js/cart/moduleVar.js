// ELEMENTOS DEL DOM
// --> Estableca los siguientes ID a los elementos del DOM o modifique los ID del siguiente listado

// General
const DOM_Cart_Button = $("#cartButton")
const DOM_Cart_Button_Counter = $("#cart_nItems")

const DOM_Cart_List_Container = $("#DOM_Cart_List_Container")

const DOM_Cart_Parameters_Amount = $("#totalAmount")
const DOM_Cart_Parameters_ItemsCounter = $("#coursesCount")

const KYUModal = $("#KYU")

const congrats = $("#congrats")
const enrolledCourses = $("#congrats .enrolledCourses")
const congrats_msg1 = $("#congrats .msg1")
const congrats_msg2 = $("#congrats .msg2")


// Páginas
// --> Actualice los ID de las paginas DIV, según su código HTML
const ItemDetailsPage = $("#detailsCourseSection")


// MENSAJES
const customMessagges = {
    emptyCart: "El carrito está vacío",
    existingCourse: "Ya tiene este curso en su carrito",
    noVacancy: "No hay más vacantes",
    noAvailable: "Este curso no está disponible por el momento"
};
// Otros mensajes: Ver la funcion checkOut_S1()
;