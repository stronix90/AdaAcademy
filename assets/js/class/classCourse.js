class Course {
    constructor(name, description, category, price, vacAvailable, teacher, conditions, ico) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.price = price;
        this.vacancies = vacAvailable;
        this.vacAvailable = vacAvailable;
        this.teacher = teacher;
        this.conditions = conditions
        this.ico = ico;
    }

    inscription() {
        if (this.vacAvailable > 0) {
            // Actualiza cupos
            this.vacAvailable -= 1

            // Actualiza en DB los ingresos del dueño
            let income = parseFloat(this.price)
            let IncomeDB = parseFloat(localStorage.getItem("Income")) || 0

            IncomeDB += income
            UpdateLocalStorage("Income", IncomeDB)

            return true
        } else return false
    }

    checkVacancies() {
        return (this.vacAvailable > 0) ? true : false
    }
}