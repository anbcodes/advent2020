const fs = require('fs');
const input = fs.readFileSync('day5_input.txt').toString().split('\n').map(v => [v.slice(0, -3), v.slice(-3)]);

var bigestId = 0;
var ids = [];

input.forEach(v => {
    var rrange = [0, 127];
    v[0].split('').forEach((l, i) => {
        let d = rrange[1] - rrange[0];
        let lower = [rrange[0], rrange[1] - Math.round(d / 2)]
        let upper = [rrange[0] + Math.round(d / 2 ), rrange[1]]
        if (l === 'F') {
            rrange = lower;
        }
        if (l === 'B') {
            rrange = upper;
        }
    });
    if (rrange[0] !== rrange[1]) {
        console.log('errror', rrange);
    }
    var row = rrange[0];
    var crange = [0, 7];
    v[1].split('').forEach((l, i) => {
        let d = crange[1] - crange[0];
        let lower = [crange[0], crange[1] - Math.round(d / 2)]
        let upper = [crange[0] + Math.round(d / 2), crange[1]]
        if (l === 'L') {
            crange = lower;
        }
        if (l === 'R') {
            crange = upper;
        }
    });
    if (crange[0] !== crange[1]) {
        console.log('c errror', crange);
    }
    var col = crange[0];
    var id = row*8 + col;
    if (bigestId < id) {
        bigestId = id
    }

    ids.push(id);
    // console.log(row, col);
})


// console.log('b', bigestId);
// && ids.includes(v - 1) !== -1 && ids.includes(v + 1) !== -1

const mine = [...new Array(128 * 8)].map((v, i) => i).filter(v => !ids.includes(v) && ids.includes(v - 1) && ids.includes(v + 1));


console.log(ids.sort().join('\n'));

console.log();

console.log(mine.join('\n'));
