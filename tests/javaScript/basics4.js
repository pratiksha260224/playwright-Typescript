//block of code

function add(a,b){
    return a+b;
}
let sum = add(11,10);
console.log(sum);


//do not have name - anonyamous function-- function expression

let sum1= function(c,d)
{
    return c+d;
}
console.log(sum1(10,5));

let sum2= (c,d)=>c+d;

console.log(sum2(10,5));