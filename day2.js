// const fs = require('fs');
// const input = fs.readFileSync('day1_input.txt').toString().split('\n');
// let vaild = 0;
// input.forEach((pass, i) => {
//     if (pass.trim() === '') {
//         return
//     }
//     let rule = pass.split(':')[0];
//     let value = pass.split(':')[1].trim();
//     rule = { start: +rule.split(/-| /g)[0], end: +rule.split(/-| /g)[1], letter: rule.split(/-| /g)[2]};
//     let vs = value.split('').filter(v => v === rule.letter);
//     let ofLetter = (value.match(new RegExp(`${rule.letter}`, 'g')) || []).length;
//     console.log(`p:${pass} r:${JSON.stringify(rule)} v:${value} l:${ofLetter} vs:${vs.join('')} i:${i}`);
//     if (ofLetter >= rule.start && ofLetter <= rule.end) {
//         vaild += 1;
//         console.log('vaild');
//     }
// });

// console.log(vaild);

// --- Part 2

const fs = require('fs');
const input = fs.readFileSync('day1_input.txt').toString().split('\n');
let vaild = 0;
input.forEach((pass, i) => {
    if (pass.trim() === '') {
        return
    }
    let rule = pass.split(':')[0];
    let value = pass.split(':')[1].trim();
    rule = { start: +rule.split(/-| /g)[0], end: +rule.split(/-| /g)[1], letter: rule.split(/-| /g)[2]};
    let vs = value.split('').filter(v => v === rule.letter);
    console.log(`p:${pass} r:${JSON.stringify(rule)} v:${value} i:${i}`);
    if ((value[rule.start - 1] === rule.letter || value[rule.end - 1] === rule.letter) && !(value[rule.start - 1] === rule.letter && value[rule.end - 1] === rule.letter)) {
        vaild += 1;
        console.log('vaild');
    }
});

console.log(vaild);