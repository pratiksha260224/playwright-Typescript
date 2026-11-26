class Person {

    age = 11;
    //location = "Pune";
    get location()
    {
        return "Pune"
    }

constructor(firstName, lastName)
{
    this.firstName = firstName;
    this.lastName = lastName;

}
//methods
fullName()
{
    //console.log(this.firstName + this.lastName);
    return this.firstName + this.lastName;
}

}

module.exports =  Person;

// let p = new Person("Rudra", "Jangamwar");
// console.log(p.age);
// console.log(p.firstName);
// console.log(p.location);
// console.log(p.fullName());

// let p1 = new Person("Pransh", "Jangamwar");
// console.log(p1.firstName);

