const fs = require('fs');

Object.prototype.log = function (v) {
    console.log(v, this);
    return this
}
const input = fs
    .readFileSync('day12_input.txt')
    .toString()
    .split('\n')
    .map(v => ({ command: v[0], amount: +v.slice(1)}));


let loc = {x: 0, y: 0};
let dir = 0;

for (let i = 0; i < input.length; i++) {
    let instruct = input[i];
    if (instruct.command === 'L') {
        dir += instruct.amount
    }
    if (instruct.command === 'R') {
        dir -= instruct.amount
        if (dir < 0) {
            dir += 360;
        }
    }

    let xc = 0;
    let yc = 0;
    if (dir % 360 === 0) {
        xc = 1;
    } else if (dir % 360 === 90) {
        yc = 1;
    } else if (dir % 360 === 270) {
        yc = -1;
    } else if (dir % 360 === 180) {
        xc = -1;
    }

    if (instruct.command === 'F') {
        loc.x += xc * instruct.amount;
        loc.y += yc * instruct.amount;
    }

    if (instruct.command === 'N') {
        loc.y += instruct.amount;
    } else if (instruct.command === 'S') {
        loc.y -= instruct.amount;
    } else if (instruct.command === 'E') {
        loc.x += instruct.amount;
    } else if (instruct.command === 'W') {
        loc.x -= instruct.amount;
    }
}

console.log(loc, Math.abs(loc.x) + Math.abs(loc.y));

// Part 2

loc = { x: 0, y: 0 };
rloc = { x: 10, y: 1 };


for (let i = 0; i < input.length; i++) {
    let instruct = input[i];
    if (instruct.command === 'L') {
        const wdir = instruct.amount;
        if (wdir % 360 === 0) {
            // Nothing
        } else if (wdir % 360 === 90) {
            let x = rloc.x;
            rloc.x = -rloc.y;
            rloc.y = x;
            console.log('11 Move Waypoint to', rloc, 'of the ship');
        } else if (wdir % 360 === 270) {
            let y = rloc.y;
            rloc.y = -rloc.x;
            rloc.x = y;
            console.log('12 Move Waypoint to', rloc, 'of the ship');
        } else if (wdir % 360 === 180) {
            rloc.x = -rloc.x;
            rloc.y = -rloc.y;
            console.log('13 Move Waypoint to', rloc, 'of the ship');
        }
    }
    if (instruct.command === 'R') {
        const dir = instruct.amount;
        if (dir % 360 === 0) {
            // Nothing
        } else if (dir % 360 === 90) {
            let y = rloc.y;
            rloc.y = -rloc.x;
            rloc.x = y;
            console.log('21 Move Waypoint to', rloc, 'of the ship');
        } else if (dir % 360 === 270) {
            let x = rloc.x;
            rloc.x = -rloc.y;
            rloc.y = x;
            console.log('22 Move Waypoint to', rloc, 'of the ship');
        } else if (dir % 360 === 180) {
            rloc.x = -rloc.x;
            rloc.y = -rloc.y;
            console.log('23 Move Waypoint to', rloc, 'of the ship');
        }
    }

    if (instruct.command === 'F') {
        let dx = rloc.x;
        let dy = rloc.y;
        console.log('Move Ship', loc, rloc, rloc.x * instruct.amount, rloc.y * instruct.amount);
        loc.x += dx * instruct.amount;
        loc.y += dy * instruct.amount;
    }

    if (instruct.command === 'N') {
        rloc.y += instruct.amount;
    } else if (instruct.command === 'S') {
        rloc.y -= instruct.amount;
    } else if (instruct.command === 'E') {
        rloc.x += instruct.amount;
    } else if (instruct.command === 'W') {
        rloc.x -= instruct.amount;
    }
}

console.log(loc, Math.abs(loc.x) + Math.abs(loc.y));

