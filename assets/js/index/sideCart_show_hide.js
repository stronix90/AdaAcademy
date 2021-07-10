function EmptyCart_HideSideBar(cartList) {

    // Si no hay items en el carrito, lo oculta
    if (cartList.length == 0) toggleCart()

}


// Muestra/Oculta sideCart con animación
function toggleCart() {
    let sideCart = $("#sideCart")

    if (sideCart.css('opacity') == "0") {
        sideCart.css("display", "block")
        sideCart.animate({
            'opacity': '1',
            'right': '0',
        }, 750);

    } else {
        sideCart.animate({
            'opacity': '0',
            'right': '-20vw',
        }, 750, function() { sideCart.css("display", "none") });
    }
}


// Oculta sideCart si se hace clic fuera del mismo
$(document).click(function(event) {
    let sideCart = $("#sideCart")
    let target = $(event.target);

    let clicInsideCart = (target[0].id == "sideCart") ? true : false

    if (!clicInsideCart) {
        target.parents().each((key, element) => {
            if (element.id == "sideCart") clicInsideCart = true
        })
    }

    if (sideCart.css('opacity') == "1" && !clicInsideCart) toggleCart()
})