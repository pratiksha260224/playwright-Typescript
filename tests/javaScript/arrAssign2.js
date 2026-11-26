var productPrices = [100, 500, 400, 200, 300];

var discountedPrices = productPrices.map(price => price* 0.9);

// Products under $400
var affordableProducts = productPrices.filter(price => price < 400);
 
// Total cost of affordable products
var totalCost = affordableProducts.reduce((sum, price) => sum + price, 0);

console.log(productPrices);

console.log(discountedPrices);

console.log(affordableProducts);

console.log(totalCost);


