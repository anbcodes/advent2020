const fs = require('fs');

Object.prototype.log = function (v) {
    console.log(v, this);
    return this
}

function padStart(arr, value, len) {
    while (arr.length < len) {
        arr.splice(0, 0, value);
    }
    return arr;
}

const input = fs
    .readFileSync('day14_input.txt')
    .toString()
    .split('\n')
    .map(v => [v.split(' = ')[0] || '', v.split(' = ')[1] || ''])
    .map(v => ({ isMask: v[0].slice(0, 4) === 'mask', index: v[0].match(/\[[0-9]+\]/g) ? +v[0].match(/\[[0-9]+\]/g)[0].slice(1, -1) : null, to: v[1].trim().split('').map(v => isNaN(+v) ? v.toLowerCase() : +v) }))

let mask = [];
let memory = [...new Array(Math.max(...input.map(v => v.index + 1)))].map(() => new Array(36).fill(0));

const writes = input.map(v => ({isMask: v.isMask, index: v.index, value: v.isMask ? v.to : padStart(parseInt(v.to.join(''), 10).toString(2).split('').map(v => +v), 0, 36)}))


// console.log(input)
// console.log(mask)
// console.log(writes)

writes.forEach(write => {
    if (write.isMask) {
        // console.log('Setting mask', write.value)
        mask = write.value;
        return
    }
    // console.log('-'.repeat(38))
    // console.log('At', write.index, write.isMask)
    // console.log('B', memory[write.index].join(''))
    // console.log('M', mask.join(''))
    // console.log('V', write.value.join(''))
    memory[write.index] = memory[write.index].map((bit, i) => {
        const newBit = write.value[i];
        const maskBit = mask[i];
        return maskBit === 'x' ? newBit || 0 : maskBit
    });
    // console.log('A', memory[write.index].join(''))
})

console.log(memory.map(v => parseInt(v.join(''), 2)).reduce((t,v) => t+v, 0))

//Part 2


memory = new Array(Math.max(...input.map(v => v.index + 1))).fill(0)


let total = 0;

writes.forEach(write => {
    if (write.isMask) {
        // console.log('Setting mask', write.value)
        mask = write.value;
        return
    }
    let memoryAddressBeforeMask = padStart(write.index.toString(2).split('').map(v => +v), 0, 36)

    let memoryAddressAfterMask = memoryAddressBeforeMask.map((bit, i) => {
        const newBit = memoryAddressBeforeMask[i];
        const maskBit = mask[i];
        return maskBit === 0 ? newBit || 0 : maskBit
    });

    // console.log('----------')

    // console.log('M', mask.join(''))
    // console.log('BM', write.index)
    // console.log('B', memoryAddressAfterMask.join(''))

    let memoryAddresses = [];

    let floating = Object.entries(memoryAddressAfterMask).filter(v => v[1] === 'x');
    // console.log('F', floating)
    for (let i = 0; i < 2 ** floating.length; i++) {
        let str = padStart(i.toString(2).split(''), 0, 36).reverse().join('');
        memoryAddresses.push(memoryAddressAfterMask.map((v, i2) => v === 'x' ? +str[floating.indexOf(floating.filter(v2 => +v2[0] === i2)[0])] : v));
    }

    memoryAddresses.forEach(add => {
        // console.log('Removed/Added', memory[parseInt(add.join(''), 2)] || 0, '/', parseInt(write.value.join(''), 2))
        total -= memory[parseInt(add.join(''), 2)] || 0;
        memory[parseInt(add.join(''), 2)] = parseInt(write.value.join(''), 2);
        total += parseInt(write.value.join(''), 2);
    })

    // console.log('A', memoryAddresses.map(v => parseInt(v.join(''), 2)).join('\n'))

})

console.log(total) // 48111840720 To low
