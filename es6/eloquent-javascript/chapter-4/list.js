/*
Write a function arrayToList that builds up a data structure like the previous
one when given [1, 2, 3] as an argument, and write a listToArray function that
produces an array from a list. Also write the helper functions prepend, which
takes an element and a list and creates a new list that adds the element to the
front of the input list, and nth, which takes a list and a number and returns
the element at the given position in the list, or undefined when there is no
such element.

If you haven’t already, also write a recursive version of nth.
*/

function arrayToList(array) {
    let index = array.length - 1;
    let node = null;
    
    while (index >= 0) {
        node = prepend(array[index], node);
        index--;
    }
    
    return node;
}

function listToArray(list) {
    let array = [];

    for (let node = list; node; node = node.rest) {
        array.push(node.value);
    }

    return array;
}

function prepend(element, list) {
    return {
        value: element,
        rest: list
    }
}

function nth(list, element) {

    if (!list) {
        return undefined;
    } else if (element === 0) {
        return list.value;
    } else {
        return nth(list.rest, element - 1);
    }
}

console.log(arrayToList([1, 2, 3]));
console.log(listToArray(arrayToList([1,2,3,4])));
console.log(nth(arrayToList([1, 2, 3]), 2));