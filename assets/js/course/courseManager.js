async function getCourses() {
    let Obj_Courses;

    // Si están disponibles, obtiene los cursos de la memoria
    Obj_Courses = getLS("courses");

    // Si no, los recupera de la DB (JSON) y los guarda en memoria
    if (!Obj_Courses) {
        Obj_Courses = await getCoursesFromDB();
        UpdateLocalStorage("courses", Obj_Courses);
    }

    return Obj_Courses;
}

// 06/07/2022 Modificado por: B.L
// Arrow function and fetch was implemented
getCoursesFromDB = async () => {
    const path = require("path");
    const dirName = path.dirname("/db/courses.json");

    try {
        const result = await fetch(dirName);
        return await result.json();
    } catch (error) {
        console.log(`Se ha producido un error: ${error}`);
    }
};

function convCourseToClass(Obj_Courses) {
    //Convierte al Objeto Prototipo 'Course'
    Obj_Courses.forEach((element) => {
        courses.push(
            new Course(
                element.name,
                element.description,
                element.category,
                element.price,
                element.vacancies,
                element.teacher,
                element.conditions,
                element.ico
            )
        );
    });
}
