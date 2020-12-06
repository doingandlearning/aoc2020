fs = require('fs')

const input = fs.readFileSync('05-input', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  return data
});

const boardingIds = input.split("\n")

const tests = ["FBFBBFFRLR", "BFFFBBFRRR", "FFFBBBFRRR", "BBFFBBFRLL"]


function findRow(locatorString) {
  let max = 127
  let min = 0
  const locators = locatorString.split("")
  locators.forEach(item => {
    if (item === "F") {
      max = min + (max - min + 1) / 2 - 1
    }
    if (item === "B") {
      min = (max + min + 1) / 2
    }
  })
  return locators[5] === "B" ? min : max
}

function findSeat(seatString) {
  let max = 7
  let min = 0
  const locators = seatString.split("")
  locators.forEach(item => {
    if (item === "L") {
      max = min + (max - min + 1) / 2 - 1
    }
    if (item === "R") {
      min = (max + min + 1) / 2
    }
  })
  return locators[2] === "R" ? min : max
}

function findSeatId(locatorString) {
  const row = findRow(locatorString.substr(0, 7))
  const seat = findSeat(locatorString.substr(7, locatorString.length))
  const id = row * 8 + seat
  return id
}

function findMissingSeat(ids) {
  let max = ids.reduce((a, b) => Math.max(a, b))
  let min = ids.reduce((a, b) => Math.min(a, b))

  const elimination = ids.map(id => {
    if (ids.includes(id + 1) && ids.includes(id - 1)) return true
    return id
  }).filter(item => item !== true).filter(item => ![max, min].includes(item))

  return elimination.reduce((a, b) => Math.max(a, b)) - 1
}

function findMissingSeat2(ids) {
  const passes = ids.sort((a, b) => a - b);
  let seat
  for (let i = 0; i < passes.length; i++) {
    const currentSeat = passes[i];
    if (passes[i + 1] === currentSeat + 2) {
      seat = currentSeat + 1
    }
  }
  return seat
}

const testIds = tests.map(test => findSeatId(test))
const testAnswer = testIds.reduce((a, b) => Math.max(a, b))

const part1 = boardingIds.map(id => findSeatId(id)).reduce((a, b) => Math.max(a, b))
const part2 = findMissingSeat2(boardingIds.map(id => findSeatId(id)))
console.log("Answer to part 1: ", part1)
console.log("Answer to part 2: ", part2)
