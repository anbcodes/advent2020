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
    .readFileSync('day16_input.txt')
    .toString()
    .split(/\n\n/g)

const rules = input[0].split('\n').map(v => v.split(':')[1].trim().split('or').map(v2 => v2.split('-').map(v3 => +v3.trim())))

const rulesNames = input[0].split('\n').map(v => v.split(':')[0].trim())


const yourTicket = input[1].split('\n')[1].split(',').map(v => +v.trim())

let tickets = input[2].split('\n').slice(1).map(v2 =>v2.split(',').map(v => +v.trim()))
// console.log(rules, yourTicket, tickets)

let total = 0

let ts = [...tickets];

ts.forEach((ticket, i) => {
    let invaild = false
    ticket.forEach(field => {
        let match = false;
        rules.forEach(rule => {
            if ((field >= rule[0][0] && field <= rule[0][1]) || (field >= rule[1][0] && field <= rule[1][1])) {
                match = true
            }
        });
        if (!match) {
            console.log('not match', field)
            total += field
            invaild = true
        }
    })
    if (invaild) {
        delete tickets[i];
    }
})

tickets = tickets.filter(v => v);

console.log(total)

// Part 2

let mapping = {};
let mappingOtherWay = {};

for (let i = 0; i < tickets[0].length; i++) {
    rules.forEach((rule, i2) => {
        let invaild = false
        tickets.forEach(ticket => {
            let field = ticket[i]
            if (!((field >= rule[0][0] && field <= rule[0][1]) || (field >= rule[1][0] && field <= rule[1][1]))) {
                invaild = true;
            }
        })

        if (!invaild) {
            if (mapping[i] === undefined) {
                mapping[i] = new Set()
            }
            if (mappingOtherWay[i2] === undefined) {
                mappingOtherWay[i2] = new Set()
            }
            mapping[i].add(i2);
            mappingOtherWay[i2].add(i);
        }
    })
}

let lastMapping = mapping

Object.entries(mapping).sort((a, b) => b[1].size - a[1].size).forEach(([key, value]) => {
    let newValue = new Set(value)
    Object.entries(lastMapping).forEach(([key2, value2]) => {
        if (key2 !== key) {
            newValue = new Set(
                [...newValue].filter(x => !value2.has(x)));
        }
    });
    lastMapping[key] = newValue;
})

let ticketIndexToFieldIndex = {}


let fieldIndexToTicketIndex = {}


Object.entries(lastMapping).forEach(([key, value]) => {
    ticketIndexToFieldIndex[key] = [...value][0]
    fieldIndexToTicketIndex[[...value][0]] = key
})

console.log(rulesNames, fieldIndexToTicketIndex)

console.log(Object.entries(fieldIndexToTicketIndex).filter(([key, value]) => rulesNames[+key].includes('departure')).map(([key, value]) => yourTicket[+value]).reduce((t, v) => t*v, 1))