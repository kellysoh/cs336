/*
Lab02
Created by: Kelly Oh
Date: 2018/09/12
*/

function Person(name, birthdate) {
    this.name = name;
    this.birthdate = birthdate;
    this.friends = [];
}



Person.prototype.getName = function (newName) {
    this.name = newName;
};
Person.prototype.greet = function () {
    console.log('Hello, I am' + this.name);
};
Person.prototype.addFriend = function (friend) {
    this.friends.push(friend);
};
Person.prototype.getAge = function () {
    var today = new Date();
    var birthDate = new Date(this.birthdate);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};
    



/* TEST*/
console.log("Hello:)");
var Kelly = new Person("Kelly", "1996/04/20");
Kelly.greet();
var Megan = new Person("Megan", "1997/09/05");
Kelly.addFriend([Megan]);


