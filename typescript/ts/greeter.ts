
class  Student  {
    public  fullName
    constructor( public firstName:string, public middleInitial:string, public lastName:string){
        this.fullName =firstName + " " + middleInitial + " " + lastName;
    }
}
interface mlj{
    firstName:string
    lastName:String
}
function greeters (person:mlj):string {
    return "Hello, " + person.firstName + " " + person.lastName
}
//可选参数和默认参数
function xxx(x1:number,x2?:number,x0=4) {
    if (x2) {
        return x0+ x1+x2
    }else{
        return x0+ x1
    }
}
console.log(xxx(3,4,5));
//剩余参数
function buildName(a:number,...b:number[]){ 
   
    return  a+eval(b.join('+')) 
}

console.log(buildName(3,4,5),'df');
let user = new Student('one','two','three')
console.log(greeters(user));
//泛型
function identity<F>(arg: Array<F>): Array<F> {
    console.log(arg.length)
    return arg;
}
let output = identity([12,31,'444'])
console.log(output);
//泛型类型
function identity2<T>(arg: T): T {
    return arg;
}
let myIdentity: <T>(arg: T) => T = identity2;

// 枚举
enum Food{
    a=1,b,c,d
}
console.log(Food.c);
