const { count } = require('console');
const fs = require('fs');

Object.prototype.log = function (v) {
    console.log(v, this);
    return this
}
const input = fs
    .readFileSync('day13_input.txt')
    .toString()
    .split('\n')

const minTime = +input[0]
// console.log(minTime);
const buses = input[1].split(',').map(v => +v).filter(v => !isNaN(v));

let min = 1e10;
let busMin = 0;

for (let i = 0; i < buses.length; i++) {
    let bus = buses[i];
    let away = Math.ceil(minTime / bus);
    // console.log('f', away);
    away = away * bus - (minTime);
    // console.log('n', away);
    if (away < min) {
        min = away;
        busMin = bus;
    }
}

console.log(min * busMin); // not 26


//Part 2

const p2Buses = input[1].split(',').map(v => +v).map((v, i) => ({ id: v, offset: i })).filter(v => !isNaN(v.id))
// const p2Buses = input[1].split(',').map(v => +v).map((v, i) => ({ id: v, offset: i })).filter(v => !isNaN(v.id))

// console.log(p2Buses)
let maxId = Math.max(...p2Buses.map(v => v.id));

let i = 0;

// console.log(p2Buses.map(v => v.id).join(', '))
// console.log(p2Buses.map(v => v.offset).join(', '))


// function lcm_more_than_two_numbers(input_array) {
//     if (toString.call(input_array) !== "[object Array]")
//         return false;
//     var r1 = 0, r2 = 0;
//     var l = input_array.length;
//     for (i = 0; i < l; i++) {
//         r1 = input_array[i] % input_array[i + 1];
//         if (r1 === 0) {
//             input_array[i + 1] = (input_array[i] * input_array[i + 1]) / input_array[i + 1];
//         }
//         else {
//             r2 = input_array[i + 1] % r1;
//             if (r2 === 0) {
//                 input_array[i + 1] = (input_array[i] * input_array[i + 1]) / r1;
//             }
//             else {
//                 input_array[i + 1] = (input_array[i] * input_array[i + 1]) / r2;
//             }
//         }
//     }
//     return input_array[l - 1];
// }

// console.log(lcm_more_than_two_numbers(p2Buses.map(v => v.id)))

let foundCount = 0;
function check(start, num, between, dist, count) {
    let found = [];
    let i = start;
    w:
    while (true) {
        if (i % 100000000 === 0) {
            // console.log(i);
        }
        if ((i + dist) % num === 0) {
            found.push(i);
        }
        if (found.length > count) {
            break;
        }
        i += between;
    }
    

    return found
}

let lastDist = 1;
let lastFirst = 0;

for (let i = 0; i < p2Buses.length; i++) {
    let bus = p2Buses[i];
    // console.log(bus.id, bus.offset)
    let dists = check(lastFirst, bus.id, lastDist, bus.offset, 1);
    lastDist = dists[1] - dists[0];
    lastFirst = dists[0];
    // console.log(dists, lastDist)
}

console.log(lastFirst);




// console.log(i);

// let away = Math.ceil(minTime / bus) * bus - (minTime);;