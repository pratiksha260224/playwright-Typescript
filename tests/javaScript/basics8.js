const Person = require('./basics7.js');

class Pet extends Person
{
    get location()
    {
        return "Arni"
    }

    constructor(firstName, lastName)
    {
        //call parent class constructor
        super(firstName, lastName);

    }
}

    let pet = new Pet("Rudra", "Jangamwar");
    console.log(pet.firstName);
    console.log(pet.fullName());
    console.log(pet.location);