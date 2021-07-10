async function getCourses() {

    let Obj_Courses

    // Si están disponibles, obtiene los cursos de la memoria
    Obj_Courses = getLS("courses")

    // Si no, los recupera de la DB (JSON) y los guarda en memoria
    if (!Obj_Courses) {
        Obj_Courses = await getCoursesFromDB()
        UpdateLocalStorage("courses", Obj_Courses)
    }

    return Obj_Courses

}


function getCoursesFromDB() {
    return new Promise((resolve) => {
        $.getJSON("./../../../db/courses.json", data => resolve(data))
    })
}


function convCourseToClass(Obj_Courses) {

    //Convierte al Objeto Prototipo 'Course'
    Obj_Courses.forEach(element => {

        courses.push(new Course(
            element.name,
            element.description,
            element.category,
            element.price,
            element.vacancies,
            element.teacher,
            element.conditions,
            element.ico,
        ))
    });
}