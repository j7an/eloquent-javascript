/*
Use the reduce method in combination with the concat method to “flatten” an
array of arrays into a single array that has all the elements of the input
arrays.
*/

const arr = [[0, 1], [2, 3], [4, 5]];

// es5
// console.log(arr.reduce(function (total, currentValue) {
//     return total.concat(currentValue);
// }));

// es6
console.log(arr.reduce((total, currentValue) => total.concat(currentValue)));
