class UserAccount {
    constructor(name, lastName, email, phone, cuil, dateBirth, state, country, currency, admin) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.cuil = cuil;
        this.dateBirth = dateBirth;
        this.state = state;
        this.country = country;
        this.currency = currency;
        this.admin = (typeof admin == 'undefined') ? false : admin;
    }
}