let fruits = ["Apple", "Chikoo", "Pomegranate", "Mango", "CustardApple"];

console.log(fruits.sort());

let scores1 = [10,21,11,15,20,18,25];

//console.log(scores1.sort());
// scores1.sort(function(a,b){
//     return a-b
// });

console.log(scores1.sort((a,b)=> a-b));

console.log(scores1.sort((a,b)=> b-a));
