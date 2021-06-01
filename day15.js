const fs = require('fs');

Object.prototype.log = function (v) {
    console.log(v, this);
    return this
}

function padStart(arr, value, len) {
    while (arr.length < len) {
        arr.splice(0, 0, value);
    }
    return arr;
}

const input = fs
    .readFileSync('day15_input.txt')
    .toString()
    .split(/,/g)
    .map(v => +v.trim())

let spoken = [...input];
// console.log(spoken)

for (let i = input.length - 1; i < 2020; i++) {
    let lastIndex = spoken.slice(0, -1).lastIndexOf(spoken[i])
    // console.log('check', spoken[i], lastIndex)
    if (lastIndex !== -1) {
        spoken.push(i - lastIndex);
    } else {
        spoken.push(0);
    }
}

console.log(spoken[2019])

//Part2

spoken = [...input];
lastSpoken = {};
spoken.forEach((v, i) => {
    lastSpoken[v] = i
})
console.log(spoken)
let lastIndex = lastSpoken[spoken[input.length - 1]];
let oldLastIndex = lastIndex
// for (let i = input.length - 1; i < 10; i++) {
for (let i = input.length - 1; i < 30000000; i++) {
    
    if (i % 10000 === 0) {
        console.log(i)
    }
    if (lastIndex !== undefined) {
        oldLastIndex = lastIndex;
        spoken.push(i - oldLastIndex);
        lastIndex = lastSpoken[spoken[i + 1]]
        // console.log('check', spoken[i + 1], i, oldLastIndex, i - oldLastIndex, lastSpoken[spoken[i + 1]], spoken[i + 1])
        lastSpoken[i - oldLastIndex] = i + 1;
    } else {
        // let oldLastIndex = lastIndex;
        spoken.push(0);
        lastIndex = lastSpoken[spoken[i + 1]]
        // console.log('check', spoken[i + 1], i, oldLastIndex, i - oldLastIndex, lastSpoken[spoken[i + 1]], spoken[i + 1])
        lastSpoken[0] = i + 1;
    }
    
}

console.log(spoken[29999999])
//                 9180000