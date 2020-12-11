const fs = require('fs');

Object.prototype.log = function (v) {
    console.log(v, this);
    return this
}
const input = fs
    .readFileSync('day7_input.txt')
    .toString()
    .split('\n')
    .map(v => ({
        color: v
            .split(/ bags contain /g)
            [0],
        inside: v
            .split(/ bags contain /g)
            [1]
            .split(', ')
            .map(v3 => ({ count: v3.split(' ')[0], color: v3.split(' ').slice(1, -1).join(' ') }))
        })
    );

let color = 'shiny gold'
let t = 0

let foundColors = [];

function isInColor(colorIn, parents = [colorIn]) {
    const holds = input.filter(v => v.color === colorIn).map(v => v.inside).flat().filter(v => v.count !== 'no').map(v => v.color)
    holds.forEach(color2 => {
        if (color === color2) {
            foundColors.push(...parents);
        } else if (!parents.includes(color2)) {
            isInColor(color2, [color2, ...parents])
        }
    })
}

input.forEach(rule => {
    isInColor(rule.color)
})

console.log([...new Set(foundColors)].length);


// Part 2

function countBagsInside(colorIn) {
    const holds = input.filter(v => v.color === colorIn).map(v => v.inside).flat().filter(v => v.count !== 'no')
    let total = 1;
    holds.forEach(color2 => {
        total += countBagsInside(color2.color) * +color2.count
    })

    return total;
}


console.log(countBagsInside('shiny gold') - 1)