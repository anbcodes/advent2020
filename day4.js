const fs = require('fs');
const input = fs.readFileSync('day4_input.txt').toString().split('\n\n').map(v => Object.fromEntries(v.split(/\n| /g).map(v2 => v2.split(":"))));
const required = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

let t = 0;

input.forEach(val => {
    v = true;
    required.forEach(r => {
        if (!Object.keys(val).includes(r)) {
            v = false;
        }
    })

    Object.entries(val).forEach(([key, value]) => {
        console.log(key, value);
        if (key === 'byr') {
            if (+value < 1920 || +value > 2002) {
                v = false;
                console.log('i byr');
            }
        }
        if (key === 'iyr') {
            if (+value < 2010 || +value > 2020) {
                v = false;
                console.log('i iyr');
            }
        }
        if (key === 'eyr') {
            if (+value < 2020 || +value > 2030) {
                v = false;
                console.log('i eyr');
            }
        }
        if (key === 'hgt') {
            // if (!value.match(/[0-9]+(cm|in)/g)) {
            //     v = false;
            //     console.log('i hgt !cm|in');
            // } else 
            tv = false;
            if (value.slice(-2) === 'cm' && +value.slice(0, -2) >= 150 && +value.slice(0, -2) <= 193) {
                tv = true;
            } else if (value.slice(-2) === 'in' && +value.slice(0, -2) >= 59 && +value.slice(0, -2) <= 76) {
                tv = true;
            }
            if (!tv) {
                console.log('i hgt v:', value.slice(-2), value.slice(0, -2));
            }
            if (!tv) {
                v = false;
            }
        }
        if (key === 'hcl') {
            if (!value.match(/^#([0-9a-f]){6}$/g)) {
                v = false;
                console.log('i hcl');
            }
        }
        if (key === 'ecl') {
            if (!value.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/g)) {
                v = false;
                console.log('i ecl');
            }
        }
        if (key === 'pid') {
            if (!value.match(/^[0-9]{9}$/g)) {
                v = false;
                console.log('i pid');
            }
        }
    })

    if (v) {
        t += 1;
    } else {
        console.log('invaild', val);
    }
})

console.log(t); // 175 to high