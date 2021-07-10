// AGREGAR ITEM A CARRITO
function addItemToCart(courseIndex) {

    // Curso ya está en el carrito
    if (cart.includes(courseIndex)) customAlert(customMessagges.existingCourse)

    // Curso no disponible
    else if (!courses[courseIndex].checkVacancies()) customAlert(customMessagges.noAvailable)

    // Agrega a carrito
    else updateCart(1, courseIndex)
}

// REMOVER ITEM DE CARRITO
function removeItemFromCart(id) {
    updateCart(2, id)
}



// CHECKOUT - PASO 1: CONTROL
function checkOut_S1() {

    // No hay nada en el carrito
    if (cart.length == 0) {
        customAlert(customMessagges.emptyCart)
        return false
    }

    // Inicio de sesión o registro
    var user = getLS("loggedUser")

    if (!user) KYUModal.modal('toggle')
    else checkOut_S2(user)

}



// CHECKOUT - PASO 2: COMPRA FINAL
function checkOut_S2(user) {

    // Vacia la lista de cursos inscripto
    DOM_EnrolledCourses(-1)

    // Recorre cada curso e inscribe o notifica error, según corresponda
    cart.forEach(id => {
        if (courses[id].inscription()) {

            // Actualiza DOM del mensaje de confirmación
            DOM_EnrolledCourses(id)

        } else customAlert(customMessagges.noAvailable)
    })


    congrats_msg1.html(`${user.name}, muchas gracias por tu compra. <br><br>Te esperamos en los siguientes cursos:`)
    congrats_msg2.html(`Hemos enviado a su casilla de correo eletrónico: ${user.email} toda la información necesaria`)


    // Reestablece valores
    // -> Carrito - Listado de items
    cart = [];
    DOM_Cart_List_Container.html("");

    // -> Carrito - Parámetros
    cartTotalAmount = 0;
    cartCoursesCount = 0;
    DOM_refreshCartParameters();

    // Reestablece seteo gráfico y muestra mensaje de inscripción
    ItemDetailsPage.hide();
    congrats.modal('show')
}



function updateCart(operation, id) {

    switch (operation) {
        case 1: // AGREGAR

            // Agrega producto al array
            cart.push(id)

            // Genera DOM del item
            DOM_Cart_AddItem(id)

            // Actualiza parametros del carrito
            cartTotalAmount += parseFloat(courses[id].price)
            cartCoursesCount++

            break;

        case 2: // ELIMINAR

            // Actualiza array
            removeItemFromArr(cart, id)
            EmptyCart_HideSideBar(cart)

            // Elimina item del DOM
            DOM_Cart_RemoveItem(id)

            // Lista del carrito - Actualiza parametros
            cartTotalAmount -= parseFloat(courses[id].price)
            cartCoursesCount--

            break;

        default:
            return

    }

    DOM_refreshCartParameters()
}