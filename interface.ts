interface Book{
    title: string;
    readonly ssbn:string;

    display():void //abstract method

}

let b1: Book={
    title:"Playwright",
    ssbn: "1234bv",

    display() {
        console.log(b1.ssbn,b1.title)
    },
}

console.log(b1.title)
console.log(b1.ssbn)
b1.display()

//extending interface

// interface Animal{
//     name:string;
// }

// interface Dog extends Animal{
//     color:string;
// }

// let mydog:Dog={
//     name:"Buddy",
//     color:"Black"
// }

// console.log(mydog.name,mydog.color)

//class implements abstract

interface Animal{
    name:string;
    sound():void;
}

class Dog implements Animal{
    name: string;
    static color:string

    constructor(name:string,color:string){
        this.name=name
        Dog.color=color
    }

    sound(): void {
        console.log("bark...")
    }
      
}

let pet =new Dog("tim","black")
console.log(pet.name,Dog.color)
pet.sound()
