function login(e) {
    e.preventDefault()

    let username = $("#txtLoginEmail").val()

    //  FAKE: Comprueba en la DB si existe el usuario. Devuelve todos sus datos si lo encuentra
    if (username == 'visitante') {

        const user1 = new UserAccount(
            "Brian",
            "Luna",
            "st.lunabrian@gmail.com",
            "1122549337",
            "20353630017",
            "22/12/1990",
            "Buenos Aires",
            "Argentina",
            "ARS")

        setLoggedUser(user1)

        $('#login').modal('hide')


    } else if (username == 'admin') {

        const user1 = new UserAccount(
            "Rogelio",
            "Dueño",
            "rogelio.dueño@ada.com.ar",
            "1122549337",
            "20353630017",
            "22/12/1990",
            "Buenos Aires",
            "Argentina",
            "ARS",
            true)

        setLoggedUser(user1)

        $('#login').modal('hide')

    } else customAlert("Usuario incorrecto \n\n Pruebe con 'visitante' o con 'admin'")
}

function signup(e, form) {
    e.preventDefault()

    // Obtiene los datos anteriores
    let users = getLS("users") || []

    // Carga el dato nuevo
    elements = $("#" + form + " :input")
    let user1 = new UserAccount(
        elements[0].value,
        elements[1].value,
        elements[2].value,
        elements[3].value,
        elements[4].value,
        elements[5].value,
        elements[6].value,
        elements[7].value,
        CURRENCY.Currency)
    users.push(user1)

    // Lo guarda en el LocalStorage
    UpdateLocalStorage("users", users)

    // FAKE: Actualiza la cantida de usuarios
    let TotalUsers = parseInt(localStorage.getItem("TotalUsers")) + 1
    localStorage.setItem("TotalUsers", TotalUsers)

    setLoggedUser(user1)
}

function setLoggedUser(user) {

    UpdateLocalStorage("loggedUser", user)
    DeleteLocalStorage("temporalSession")

    toggleLogin(user)
    getUserCurrency()
}

function logout() {

    localStorage.removeItem("loggedUser")

    toggleLogin()

    customAlert("Se ha deslogueado correctamente")

    setTemporalSession()
}

function setTemporalSession() {

    // Si el usuario no está logueado creada una sesión temporal
    let temporalSession = { "currency": CURRENCY.Currency }

    // Lo guarda en el LocalStorage
    UpdateLocalStorage("temporalSession", temporalSession)

}

function showLoginScreen() {
    let user = getLS("loggedUser")
    if (user) alert("Ya está logueado")
    else $("#login").modal('toggle')

}

function toggleLogin(user) {
    if (user) {
        $("#userName").html(user.name)

        $(".unloggedBox").fadeOut(1000, function() {
            $(".LoggedBox").fadeIn(1000)
            if (user.admin) $(".AdminBox").fadeIn(1000)
            else $(".AdminBox").fadeOut(1000)
        })

    } else {
        $(".AdminBox").fadeOut(1000)
        $(".LoggedBox").fadeOut(1000, function() {
            $(".unloggedBox").fadeIn(1000)
        })
    }
}