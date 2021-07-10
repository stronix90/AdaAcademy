$(document).ready(function() {

    // CONTROL DE USUARIO
    let user = getLS("loggedUser")

    try {
        if (user.admin != true) {
            alert("No puede ingresar a este sitio")
            window.location.href = "index.html";
        }

    } catch (error) {
        alert("No puede ingresar a este sitio")
        window.location.href = "index.html";
    }

    refreshStatistics()

});


function refreshStatistics() {

    // Cantidad de cursos
    let NCourses = (getLS("courses")).length
    $("#CoursesStats").html(NCourses)

    // Usuarios
    let TotalUsers = getLS("TotalUsers")
    $("#UsersStats").html(TotalUsers)

    // Ingresos
    let IncomeStats = getLS("Income") || 0
    $("#IncomeStats").html(IncomeStats)

    // Visitantes (Números inventados)
    let Visitor = parseInt(Math.random() * (20000 - 100) + 100)
    $("#VisitorStats").html(Visitor)


}


function addCourse(form, e) {
    e.preventDefault()

    // Obtiene los datos anteriores
    let courses = getLS("courses") || []

    // Obtiene los datos del formulario
    elements = $(`#${form} :input`)

    // Verifica si es una modificación o un alta
    let index = elements[elements.length - 1].value

    if (index) {
        // Modificación

        for (const key of elements) {
            key_ad = key.id.toLowerCase().split("").splice(3, 100).join("")
            courses[index][key_ad] = key.value
        }

    } else {
        // Alta

        courses.push(new Course(
            elements[0].value,
            elements[1].value,
            elements[2].value,
            elements[3].value,
            elements[4].value,
            elements[5].value,
            elements[6].value,
            elements[7].value))
    }

    // Lo guarda en el LocalStorage    
    UpdateLocalStorage("courses", courses)

    // Actualiza estadísticas y modal
    refreshStatistics()
    ListCourses()

};


function ListCourses() {
    let courses = getLS("courses") || []
    let html
    html = courses.map((course, index) =>
        `<li id="course_${index}" style="list-style: none;">
            <div class="row">

                <div class="col">${course.name}</div>

                <div class="col-auto">

                    <a id="edit_${index}" onclick="setModCourse('${course.name}')" class="btn-edit" ><i class="fas fa-pencil-alt"></i></a>

                    <a id="del_S2_${index}" style="display:none" onclick="DeleteCourse_S2(${index}, '${course.name}')" class="btn-deleteStronger"><i class="far fa-trash-alt"></i></a>

                </div>

                <div class="col-auto">
                    <a id="del_S1_${index}" onclick="DeleteCourse_S1(${index})" class="btn-delete"><i class="far fa-trash-alt"></i></a>
                </div>

            </div>
        </li>`
    ).join("")
    $("#ListCourses").html(html)
}

function DeleteCourse_S1(id) {

    customAlert("Si está seguro de eliminar el curso, haga click en el cesto de basura de la izquierda", 5000)

    $(`#edit_${id}`).hide()
    $(`#del_S2_${id}`).show()
    setTimeout(function() {
        $(`#edit_${id}`).show()
        $(`#del_S2_${id}`).hide()
    }, 5000);

}


const DeleteCourse_S2 = (id, courseName) => {

    let courses = getLS("courses") || []

    let Index = courses.findIndex(course => course.name == courseName)
    if (Index !== -1) courses.splice(Index, 1)

    UpdateLocalStorage("courses", courses)

    $(`#course_${id}`).remove()

}


const showAMB = () => {
    ListCourses()
    $('#Modal_ListCourses').modal('toggle')
}


const setModCourse = (courseName) => {

    let courses = getLS("courses") || []
    let index = courses.findIndex(course => course.name == courseName)

    // Recorre las propiedades del curso que se va a modificar, para cargarlo en los campos del formulario
    for (const key in courses[index]) $(`#txt${capFirstLetter(key)}`).val(courses[index][key])

    // Establece el ID del elemento a modificarse
    $("#txtMod").val(index)

    // Modales
    $('#AddCourse').modal('toggle')
    $('#Modal_ListCourses').modal('toggle')
}