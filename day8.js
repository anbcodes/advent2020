const fs = require('fs');

Object.prototype.log = function (v) {
    console.log(v, this);
    return this
}
const input = fs
    .readFileSync('day8_input.txt')
    .toString()
    .split('\n')
    .map(v => ({
        instruction: v
            .split(" ")
            [0],
        value: +v
            .split(" ")[1]
        })
    );

let done = []
let acc = 0
let i = 0; 
while (i < input.length) {
    command = input[i]
    if (!done.includes(i)) {
        done.push(i);
    } else {
        break
    }
    if (command.instruction === 'nop') {
        i++
    } else if (command.instruction === 'acc') {
        acc += command.value
        i++
    } else if (command.instruction === 'jmp') {
        i += command.value
    }
}


console.log(acc)

// Part2


let oi = 0;
options:
while (true) {
    done = []
    acc = 0
    i = 0;
    while (true) {
        command = input[i]
        if (!command) {
            break options;
        }
        if (!done.includes(i)) {
            done.push(i);
        } else {
            break;
        }
        if (command.instruction === 'nop') {
            i++
        } else if (command.instruction === 'acc') {
            acc += command.value
            i++
        } else if (command.instruction === 'jmp') {
            i += command.value
        }
    }
    if (oi !== 0) {
        let toChange = input.filter((v) => v.instruction === 'nop' || v.instruction === 'jmp')[oi - 1];
        if (toChange) {
            input[input.indexOf(toChange)].instruction = toChange.instruction === 'nop' ? 'jmp' : 'nop'
        } else {
            break;
        }
    }
    let toChange = input.filter((v) => v.instruction === 'nop' || v.instruction === 'jmp')[oi];
    if (toChange) {
        input[input.indexOf(toChange)].instruction = toChange.instruction === 'nop' ? 'jmp' : 'nop'
        oi++;
    } else {
        break;
    }
}

console.log(acc)