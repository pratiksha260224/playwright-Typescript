var expenses = [100, 200, 500, 1000, 700]; 
var totalExpenses = 0;
var highestExpense = expenses[0];
var lowestExpense = expenses[0];
 
// Calculate total expenses
for (let i = 0; i < expenses.length; i++) {
    totalExpenses += expenses[i];
}
 
// let totalExpenses = expenses.reduce((sum, val)=> sum+ val,0);
// console.log(totalExpenses);

// Find highest and lowest expenses
for (let i = 0; i < expenses.length; i++) {
    if (expenses[i] > highestExpense) {
        highestExpense = expenses[i];
    }
    if (expenses[i] < lowestExpense) {
        lowestExpense = expenses[i];
    }
}
 
console.log("Total Expenses:", totalExpenses);
console.log("Highest Expense:", highestExpense);
console.log("Lowest Expense:", lowestExpense);