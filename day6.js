const fs = require('fs');
const input = fs.readFileSync('day6_input.txt').toString().split('\n\n').map(v => v.split(/\n/g).map(v2 => v2.split(''))).map(v => ({values: v.flat(), ppl: v.length}));


const ch1 = input.map(v => [...new Set(v.values)].length).reduce((t, v) => t + v, 0);
const ch2 = input.map(v => [...new Set(v.values)].filter(v2 => v.values.filter(v3 => v3 === v2).length === v.ppl).length).reduce((t, v) => t + v, 0);

console.log(ch1, ch2)