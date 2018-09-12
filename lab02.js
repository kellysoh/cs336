function Person(name, birthdate, age, friends) {
    this.name = '';
    this.birthdate = '';
    this.age = getAge(birthdate);
    this.friends = [];
}


function Friend() {
    Person.call(this);
    this.friends = [];
}

Friend.prototype =
Object.create(Person.prototype);
Friend.prototype.constructor = Friend; 


function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

/* TEST*/

var mark = new Person;
mark.name = '';
mark.birthdate = 'September 20, 1996';
