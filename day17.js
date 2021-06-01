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
    .readFileSync('day17_input.txt')
    .toString()
    .split(/\n/g)
    .map(v => v.split(''))

let area = []

function set(x, y, z, value, a = area) {
    if (!a[x]) {
        a[x] = []
    }
    if (!a[x][y]) {
        a[x][y] = []
    }
    a[x][y][z] = value
}

function setArr(arr, value) {
    set(arr[0], arr[1], arr[2], value)
}
function setObj(obj, value) {
    set(obj.x, obj.y, obj.z, value)
}

function get(x, y, z, a = area) {
    if (!a[x]) {
        a[x] = []
    }
    if (!a[x][y]) {
        a[x][y] = []
    }
    return a[x][y][z] || '.'
}

input.forEach((yv, y) => {
    yv.forEach((xv, x) => {
        set(x, y, 0, xv)
    })
})

let newArea = JSON.parse(JSON.stringify(area))

for (let i = 0; i < 6; i++) {
    for (let x = Math.min(...Object.keys(area).map(v => +v)) - 1; x < area.length + 1; x++) {
        for (let y = Math.min(...Object.keys(area[x] || []).map(v => +v)) - 1; y < (area[x] || []).length + 1; y++) {
            for (let z = Math.min(...Object.keys((area[x] || [])[y] || []).map(v => +v)) - 1; z < ((area[x] || [])[y] || []).length + 1; z++) {
                let count = 0;
                for (let xp = -1; xp <= 1; xp++) {
                    for (let yp = -1; yp <= 1; yp++) {
                        for (let zp = -1; zp <= 1; zp++) {
                            if (xp === 0 && yp === 0 && zp === 0) {
                                continue
                            }
                            if (get(x + xp, y + yp, z + zp) === '#') {
                                count += 1
                            }
                        }
                    }
                }
                if (count !== 2 && count !== 3 && get(x, y, z) === '#') {
                    set(x, y, z, '.', newArea)
                }
                if (count === 3 && get(x, y, z) === '.') {
                    set(x, y, z, '#', newArea)
                }
            }
        }
    }

    console.log(area)
    console.log(newArea)

    area = newArea
}

console.log(area.flat(4).filter(v => v === '#').length)
