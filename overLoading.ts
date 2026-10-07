//method overloading and constructor overloading

class Calculator{


    //constructor overloading
    constructor() //default constructor
    constructor(a:number, b:number) //parametrized 

    constructor(a?:number, b?:number){
        if(a!==undefined && b!==undefined){
            console.log(`Sum of a & b: `,(a+b))
        }
        else{
            console.log("default constructor called...")
        }
    }

    //method overloading

    add(a:number,b:number):number;
    add(a:number,b:number,c:number):number;
    add(a:number,b:number,c?:number):number{
        if(c!==undefined){
            return a+b+c
        }
        return a+b
    }
}

const calc = new Calculator()
console.log(calc.add(1,2))