//class can reuse the properties and methods of another class

class Car{
    name:string;
    color:string;
    model: string;

    constructor(name:string,color:string,model:string){
        this.name=name;
        this.color=color;
        this.model=model;
    }

    //method override
    start(){
        console.log("Car started...")

    }

    stop(){
        console.log("car stopped")
    }

    displayInfo(){
        console.log(`Name: ${this.name}, color: ${this.color}, model: ${this.model}`)
    }
}

class Honda extends Car{
    year:number;

    constructor(name:string,color:string,model:string,year:number){
        super(name,color,model)
        this.year=year
    }

    start(){
        console.log("Honda started")
    }

    yom(){
        console.log(`Name: ${this.name}, color: ${this.color}, model: ${this.model},Year of manufacture: ${this.year}`)
    }
}
class Tata extends Car{
    year:number;

    constructor(name:string,color:string,model:string,year:number){
        super(name,color,model)
        this.year=year
    }

    start(){
        console.log("Tata started")
    }

    yom(){
        console.log(`Name: ${this.name}, color: ${this.color}, model: ${this.model},Year of manufacture: ${this.year}`)
    }
}

 const honda = new Honda("honda", "red","civic",2023)
 honda.displayInfo()
 honda.yom()

 const tata = new Tata("Tata","white","sierra",2025)
 tata.start();
 tata.yom();


//parent class var holding child class obj
 const car:Car = new Honda("honda", "red","civic",2026)
 car.start();
 car.displayInfo()

