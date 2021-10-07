/* 
###Interface### 
interface Human {
    name: string;
    age: number;
    gender: string;
} */

class Human {
    public name: string;
    public age: number;
    public gender: string;

    constructor(name:string, age:number, gender?:string) {  //  ? means it's optional
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
}

const empodi = new Human("empodi", 26, "male");

const sayHi = (person: Human) => {

    return `Hello ${person.name}, you are ${person.age} and you are a ${person.gender}...`;
};

console.log(sayHi(empodi));

export{};