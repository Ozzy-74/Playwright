class Parent{
    num:number=10;

    constructor(){
        console.log("Parent class constructor..")
    }
    display(){
        console.log("Display parent class method...")
    }

}

class Child extends Parent{
    num: number=20

    constructor(){
        super(); //must be called
        console.log("child class constructor...")
    }

    show(){
        console.log(super.num)// cant used to invoke parent class prop. in java, its possible
        console.log(this.num)
        console.log('This is child class show method...')
    }

    display(){ //overide method
        super.display()
        console.log("Method from child class")
    }
}

let cl = new Child()
cl.show()
cl.display()