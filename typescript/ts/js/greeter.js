"use strict";
var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
function greeters(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
//可选参数和默认参数
function xxx(x1, x2, x0) {
    if (x0 === void 0) { x0 = 4; }
    if (x2) {
        return x0 + x1 + x2;
    }
    else {
        return x0 + x1;
    }
}
console.log(xxx(3, 4, 5));
//剩余参数
function buildName(a) {
    var b = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        b[_i - 1] = arguments[_i];
    }
    return a + eval(b.join('+'));
}
console.log(buildName(3, 4, 5), 'df');
var user = new Student('one', 'two', 'three');
console.log(greeters(user));
//泛型
function identity(arg) {
    console.log(arg.length);
    return arg;
}
var output = identity([12, 31, '444']);
console.log(output);
//泛型类型
function identity2(arg) {
    return arg;
}
var myIdentity = identity2;
// 枚举
var Food;
(function (Food) {
    Food[Food["a"] = 1] = "a";
    Food[Food["b"] = 2] = "b";
    Food[Food["c"] = 3] = "c";
    Food[Food["d"] = 4] = "d";
})(Food || (Food = {}));
console.log(Food.c);
