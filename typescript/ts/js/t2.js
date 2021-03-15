"use strict";
var Student3 = /** @class */ (function () {
    function Student3(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student3;
}());
function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user3 = new Student3("Jane", "M.", "User");
console.log(greeter(user3));
document.body.innerHTML = greeter(user3);
