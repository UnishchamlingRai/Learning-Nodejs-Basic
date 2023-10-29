// console.log(arguments);
// console.log(require("module").wrapper);

const C = require("./test-module-1");
const calc2 = require("./test-module-2");
const calc = new C();
console.log(calc.add(3, 3));
console.log(calc2.multiply(2, 4));

const { add, multiply, divide } = require("./test-module-2");
console.log(divide(4, 2));

///caching
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();
