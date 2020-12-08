fs = require('fs')

const input = fs.readFileSync('07-input', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  return data
});

const testInput = fs.readFileSync('07-input-test', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  return data
});

function containsColour(item) {
  const regex = new RegExp('[0-9]+ ' + item, 'g')
  return testInputSplit.filter(item => item.match(regex)).map(item => item.split(" ").slice(0, 2).join(" ")).flat().filter((v, i, a) => a.indexOf(v) === i)
}

const regex = /[0-9] shiny gold/
const testInputSplit = testInput.split("\n")
const testTopLevelColours = testInputSplit.filter(item => item.match(regex)).map(item => item.split(" ").slice(0, 2).join(" "))
const testSsecondLevelColours = testTopLevelColours.map(item => containsColour(item)).flat().filter((v, i, a) => a.indexOf(v) === i);

function findColours(colour, input) {
  const toCheck = [colour]
  const checked = []
  const matches = []

  while (toCheck.length > 0) {
    const item = toCheck.pop()
    checked.push(item)
    const regex = new RegExp('[0-9]+ ' + item, 'g')
    const containsColour = input.filter(item => item.match(regex)).map(item => item.split(" ").slice(0, 2).join(" ")).flat()
    matches.push(...containsColour)
    matches.forEach(match => !checked.includes(match) && toCheck.push(match))
  }
  return matches.filter((v, i, a) => a.indexOf(v) === i).length
}

function countFilledBags(input) {
  const toCount = ["shiny gold"]
  let bags = 0
  while (toCount.length > 0) {
    console.log(toCount)
    const item = toCount.pop()
    bags += 1
    const regex = new RegExp('^' + item, 'g')
    const line = input.filter(item => item.match(regex))
    const newColours = line[0].split(" contain ")[1].split(", ")
    newColours.forEach(colour => {
      const splitLine = colour.split(" ")
      const number = splitLine[0]
      if (number !== "no") {
        const newColour = splitLine.slice(1, 3).join(" ")
        const newColours = Array(parseInt(number)).fill(newColour)
        toCount.push(...newColours)
      }
    })
  }
  console.log(bags)
}

countFilledBags(testInputSplit)

const inputSplit = input.split("\n")

console.log(findColours("shiny gold", testInputSplit))


const testAnswer = findColours("shiny gold", testInputSplit)
const testAnswer2 = []

const part1 = findColours("shiny gold", inputSplit)
const part2 = []

console.log("Answer to test part 1: ", testAnswer)
console.log("Answer to part 1: ", part1)


console.log("Answer to test part 2: ", testAnswer2)
console.log("Answer to part 2: ", part2)
