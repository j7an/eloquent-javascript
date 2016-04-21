// Write a loop that makes seven calls to console.log to output the following triangle
const row = 7;
let rowText = '';

for (let x = 1; x <= row; x++) {
    for (let y = 1; y <= x; y++) {
        rowText += '#';
    }
    console.log(rowText);
    rowText = ''; // reset string for next console.log
}
