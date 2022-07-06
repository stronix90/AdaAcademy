function DOM_refreshCartParameters() {
    //Actualiza total de compra
    DOM_Cart_Parameters_Amount.html(cartTotalAmount);
    DOM_Cart_Parameters_Amount.attr("data-price", cartTotalAmount);

    // Anima botón de carrito
    DOM_Cart_Button.animate({
        height: "+=5px",
        width: "+=5px",
    })
        .delay(500)
        .animate({
            height: "-=5px",
            width: "-=5px",
        });

    // Muestra/Oculta botón de carrito
    DOM_Cart_Parameters_ItemsCounter.html(cartCoursesCount);

    if (cartCoursesCount > 0)
        DOM_Cart_Button_Counter.html(cartCoursesCount).show(500);
    else DOM_Cart_Button_Counter.hide(500);
}

function DOM_Cart_AddItem(id) {
    let html = `
    <li id="cart_item_${id}" class="list-group-item">
        ${courses[id].name} - 
        <span class="curr_Simbol">$</span>
        <span class="price" data-price="${courses[id].price}">${courses[id].price}</span> -
        <i class="far fa-trash-alt" onclick="removeItemFromCart(${id})"></i>
    </li>
    `;
    DOM_Cart_List_Container.append(html);
}

function DOM_Cart_RemoveItem(id) {
    $("#cart_item_" + id).animate(
        {
            left: "+=300px",
            opacity: "0",
        },
        1000,
        function () {
            $("#cart_item_" + id).remove();
        }
    );
}

function DOM_EnrolledCourses(id) {
    if (id == -1) enrolledCourses.html("");
    else enrolledCourses.append(`<li>${courses[id].name}</li>`);
}
