let person = {

    firstName: "Pransh",
    lastName: "Jangamwar",
    age: 11,
    fullName: function()
    {
        console.log( this.firstName + this.lastName );
    }

}

console.log(person.fullName());
console.log(person.firstName);
console.log(person['lastName']);
person.firstName = "Rudra";
console.log(person.firstName);
person.gender = "Male";
console.log(person);
delete person.gender;
console.log(person);
console.log('gender' in person);
console.log('lastName' in person);

for (let key in person) {
    console.log(person[key]);
}
