import * as $C from 'js-combinatorics'
const fs = require('fs');

Object.prototype.log = function (v) {
    console.log(v, this);
    return this
}
const input = fs
    .readFileSync('day9_input.txt')
    .toString()
    .split('\n')
    .map(v => +v);

let preambleLen = 25;

let past = input.slice(0, preambleLen);
let number = null;
for (let i = preambleLen; i < input.length; i++) {
    number = input[i]
    let options = [...new $C.Combination(past, 2)];
    let result = options.filter(v => v[0] + v[1] === number)
    if (result.length === 0) {
        break;
    }

    past.push(number);
    past.shift();
}


console.log(number)

let found = number;

// Part2

function check(nums, i) {
    let mynums = [...nums, input[i - 1]];
    let reduced = mynums.reduce((t, v) => t+v, 0)
    if (reduced > found) {
        return false;
    }

    if (reduced < found) {
        return check(mynums, i - 1);
    }

    if (reduced === found) {
        return mynums;
    }
}

let nums = 0;
let num = 0;

for (let i = 0; i < input.length; i++) {
    num = input[i];
    if (num >= found) {
        continue;
    }
    nums = check([num], i)
    if (nums) {
        break;
    } else {
        continue;
    }
}

console.log(nums, nums.reduce((t, v) => t + v, 0));
nums.sort();
console.log(nums[0] + nums.slice(-1)[0]);
// console.log(num + nums)