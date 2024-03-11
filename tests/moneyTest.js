import { formatCurrency } from "../scripts/utils/money.js";

console.log("Test Format currency");
console.log("With convert cents to dollars:");
formatCurrency(2002) === "20.02" ? console.log(true) : console.log(false);
console.log("With (0) :");
formatCurrency(0) === "0.00" ? console.log(true) : console.log(false);
console.log("Round before formating : ");
formatCurrency(2000.5) === "20.01" ? console.log(true) : console.log(false);
