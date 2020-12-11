const fs = require('fs');

Object.prototype.log = function (v) {
    console.log(v, this);
    return this
}
async function run() {
const input = fs
    .readFileSync('day11_input.txt')
    .toString()
    .split('\n')
    .map(v => v.split(''));


let currentState = JSON.parse(JSON.stringify(input));

function filled(x, y) {
    if (y < 0) {
        return 0
    }
    if (y >= currentState.length) {
        return 0
    }
    return currentState[y][x] === '#' ? 1 : 0 
}

while (true) {
    let newState = JSON.parse(JSON.stringify(currentState));

    for (let y = 0; y < currentState.length; y++) {
        for (let x = 0; x < currentState[y].length; x++) {
            if (currentState[y][x] === 'L' || currentState[y][x] === '#') {
                let count = 0
                count += filled(x - 1, y + 1);
                count += filled(x, y + 1);
                count += filled(x + 1, y + 1);
                count += filled(x - 1, y);
                count += filled(x + 1, y);
                count += filled(x - 1, y - 1);
                count += filled(x, y - 1);
                count += filled(x + 1, y - 1);

                if (count === 0) {
                    newState[y][x] = '#'
                }
                if (count >= 4) {
                    newState[y][x] = 'L'
                }
            }
        }
    }




    if (JSON.stringify(currentState) === JSON.stringify(newState)) {
        break;
    }

    currentState = newState

}

console.log(currentState.map(v => v.join('')).join('\n'))
console.log(currentState.flat().filter(v => v === '#').length)

console.log('Part 2')

// Part 2

currentState = JSON.parse(JSON.stringify(input));

function filled2(x, y) {
    if (y < 0) {
        return 0
    }
    if (y >= currentState.length) {
        return 0
    }
    return currentState[y][x] === '#' ? 2 : (currentState[y][x] === 'L' ? 1 : 0)
}

function dirfilled(x, y, dx, dy) {
    let sx = currentState[0].length;
    let sy = currentState[0].length;
    let lx = x;
    let ly = y;
    while (true) {
        lx += dx;
        ly += dy;
        if (lx < 0 || ly < 0 || lx > sx || ly > sy) {
            return 0
        }

        let found = filled2(lx, ly);

        if (found === 1) {
            return 0
        } else if (found === 2) {
            return 1
        }
        
    }
}
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
while (true) {
    await sleep(50) // Comment this out for speed
    let newState = JSON.parse(JSON.stringify(currentState));

    for (let y = 0; y < currentState.length; y++) {
        for (let x = 0; x < currentState[y].length; x++) {
            if (currentState[y][x] === 'L' || currentState[y][x] === '#') {
                let count = 0
                count += dirfilled(x, y, -1, 1);
                count += dirfilled(x, y, 0, 1);
                count += dirfilled(x, y, 1, 1);
                count += dirfilled(x, y, -1, 0);
                count += dirfilled(x, y, 1, 0);
                count += dirfilled(x, y, -1, -1);
                count += dirfilled(x, y, 0, -1);
                count += dirfilled(x, y, 1, -1);
                if (count === 0) {
                    newState[y][x] = '#'
                }
                if (count >= 5) {
                    newState[y][x] = 'L'
                }
            }
        }
    }


    console.log(newState.map(v => v.join('')).join('\n'))
    console.log(newState.flat().filter(v => v === '#').length)

    if (JSON.stringify(currentState) === JSON.stringify(newState)) {
        break;
    }

    currentState = newState

}
}

run()