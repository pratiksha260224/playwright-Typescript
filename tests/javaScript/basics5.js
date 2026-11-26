const Person = require('./basics7');

let p1 = new Person("Pransh", "Jangamwar");
console.log(p1.firstName);
console.log(p1.fullName());

let day = "Sunday ";

console.log(day);
console.log(day.length);
console.log(day.indexOf("n"));
console.log(day[2]);
console.log(day.charAt(3));
let subDay = day.slice(1,4);
console.log(subDay);

console.log(day.trim().length);

let splitDay= day.split("d");
console.log(splitDay[0]);

let date = '11';
let nextDate = '16';
let diff = parseInt(nextDate)- parseInt(date);
console.log(diff);

diff.toString();  //number to string conversion

let newQuote = day + "is Funday";
console.log(newQuote);
let val = newQuote.indexOf("day");
console.log(val);

let val1 = newQuote.indexOf("day", 5);
console.log(val1);

//day occurance

let count = 0;
let value = newQuote.indexOf("day");

while(value!= -1){

    count++
    value = newQuote.indexOf("day", value+1);
}
console.log(count);

