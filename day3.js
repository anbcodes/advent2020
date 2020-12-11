const fs = require('fs');
const input = fs.readFileSync('day2_input.txt').toString().split('\n').map(v => v.split('').map(v2 => v2 === '#' ? 1 : 0));
const slopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];
const inputc = [...input.map(v => [...v])];
let tt = 0;
slopes.forEach(slope => {
    const at = [0, 0];
    let t = 0;
    while (at[1] <= input.length) {
        at[0] += slope[0];
        at[1] += slope[1];

        if (!input[Math.floor(at[1])]) {
            break;
        }
        const blockAt = input[Math.floor(at[1])][Math.floor(at[0] % input[0].length)];
        if (blockAt === 1) {
            t += 1;
            inputc[Math.floor(at[1])][Math.floor(at[0] % input[0].length)] = 2;
        } else {
            inputc[Math.floor(at[1])][Math.floor(at[0] % input[0].length)] = 3;
        }
    }

    // console.log(input.map(v => v.map(v2 => v2 === 0 ? '.' : (v2 === 1 ? '#' : (v2 === 2 ? 'X' : 'O'))).join('')).join('\n'))

    if (tt === 0) {
        tt = t;
    } else {
        tt *= t;
    }

    console.log(t);
})

console.log(tt);