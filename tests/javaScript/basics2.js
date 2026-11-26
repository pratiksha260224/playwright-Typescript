let scores = [81,82,87,92,97,99];

console.log(scores.length);
console.log(scores.indexOf(99));
console.log(scores[2]);
console.log(scores.includes(95));

var sum = 0;
for(let i = 0; i<scores.length; i++){

    //console.log(scores[i]);
    sum = sum + scores[i];

}
console.log(sum);

//reduce
let total = scores.reduce((sum, score)=> sum+score,0);
console.log(total);

//filter
var scores1 = [10,12,14,15,16,18,20];

var evenScores = [];
for(let i=0; i<scores1.length;i++){

    if(scores1[i]%2 == 0){
        evenScores.push(scores1[i]);
    }
}
console.log(evenScores);

let evenScoreArray = scores1.filter(scores1=> scores1%2==0);
console.log(evenScoreArray);

//map
let mappedArray = evenScoreArray.map(scores1=> scores1*3);
console.log(mappedArray);

let totalValue = mappedArray.reduce((sum,val)=> sum+val,0);
console.log(totalValue);

var scores2 = [10,12,14,15,16,18,20];

let sumOfScores2 = scores2.filter(scores2=>scores2%2==0).map(scores2=>scores2*3).reduce((sum,val)=> sum+val,0);

console.log(sumOfScores2);


