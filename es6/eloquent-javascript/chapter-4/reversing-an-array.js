/*
Arrays have a method reverse, which changes the array by inverting the order in
which its elements appear. For this exercise, write two functions, reverseArray
and reverseArrayInPlace. The first, reverseArray, takes an array as an argument
and produces a new array that has the same elements in the inverse order. The
second, reverseArrayInPlace, does what the reverse method does: it modifies the
array given as argument in order to reverse its elements. Neither may use the
standard reverse method.

Thinking back to the notes about side effects and pure functions in the previous
chapter, which variant do you expect to be useful in more situations? Which one
is more efficient?
*/

function reverseArray(array) {
    let revArray = [];

    for (let i = array.length - 1; i >= 0; i--) {
        revArray.push(array[i]);
    }
    return revArray;
}

function reverseArrayInPlace(array) {
    const length = array.length;

    for (let i = length - 1; i >= 0; i--) {
        array.push(array[i]);
    }
    for (let x = 0; x < length; x++) {
        array.shift();
    }
    return array;
}

console.log(reverseArray(['Banana', 'Grape', 'Orange']));

console.log(reverseArrayInPlace(['Banana', 'Grape', 'Orange']));
