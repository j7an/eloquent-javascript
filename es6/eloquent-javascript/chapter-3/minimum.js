/*
The previous chapter introduced the standard function Math.min that returns its
smallest argument. We can do that ourselves now. Write a function min that takes
two arguments and returns their minimum.
*/

function min(num1, num2) {
    if (num1 < num2) {
        return num1;
    } else {
        return num2;
    }
}

console.log(min(1, 2));
