class Student3 {
    fullName: string;
    constructor(public firstName:string, public middleInitial:string, public lastName:string) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person : Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user3 = new Student3("Jane", "M.", "User");
console.log( greeter(user3));
document.body.innerHTML = greeter(user3);