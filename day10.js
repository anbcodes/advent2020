const fs = require('fs');

Object.prototype.log = function (v) {
    console.log(v, this);
    return this
}
const input = fs
    .readFileSync('day10_input.txt')
    .toString()
    .split('\n')
    .map(v => +v);

input.push(0)

input.sort((a, b) => a - b);

const n = input.map((v, i, a) => v - a[i-1]).filter(v => !isNaN(v))

let ones = n.filter(v => v === 1).length

let threes = n.filter(v => v === 3).length + 1

// if (input[0] === 1) {
//     ones += 1;
// }

// if (input[0] === 3) {
//     threes += 1;
// }

console.log(input, n, ones * threes);
// Part2

const groups = []

for (let i = 0; i < n.length; i++) {
    if (n[i] === 1) {
        let t = 0;
        let i2;
        for (i2 = i; i2 < n.length; i2++) {
            if (n[i2] !== 1) {
                break;
            }
            t++;
        }
        i = i2;
        groups.push(t);
    } else {
        groups.push('three');
    }
}

console.log(groups)

const options = groups.map((v) => {
    switch (v) {
        case 'three':
            return 0 + 1
        case 1:
            return 0 + 1
        case 2:
            return 1 + 1
        case 3:
            return 3 + 1
        case 4:
            return 6 + 1
        // case 5:
        //     return 7 + 1
        // case 6:
        //     return 9 + 1
        default:
            throw new Error('no mapping for ' + v)
    }
})

console.log(options, options.reduce((t, v) => t*v, 1));

//1,1,1,1

//1,1,1,1,1
// 3 3s
// 4 1s

// 1,1,1 1,1,1
// 1 1,1,1 1,1
// 1,1 1,1,1 1

// 1,1,1,1,1,1


// console.log(Math.pow(2, options - 1))
