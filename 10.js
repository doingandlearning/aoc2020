fs = require('fs')

const input = fs.readFileSync('10-input', 'utf8', function (err, data) {
  if (err) {
    e
    return console.log(err);
  }
  return data
});

const testInput = fs.readFileSync('10-input-test', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  return data
});

const testInputCleaned = testInput.split("\n").map(i => parseInt(i))
const inputCleaned = input.split("\n").map(i => parseInt(i))

function countDifferences(input) {
  let [ones, twos, threes] = [1, 0, 1]
  const sortedInput = input.sort((x, y) => x - y)
  sortedInput.forEach((item, idx) => {
    switch (sortedInput[idx + 1] - item) {
      case 1:
        ones += 1
        break
      case 2:
        twos += 1
        break
      case 3:
        threes += 1
        break
      default:
        break
    }
  })
  return { ones, twos, threes }
}
const testDifferences = countDifferences(testInputCleaned)
const differences = countDifferences(inputCleaned)

function countDistinctWays(input) {
  const sortedInput = input.sort((x, y) => x - y)
  let distinctWays = 0
  const max = Math.max(...sortedInput)
  let current = 0
  let index = 0
  while (current < max) {
    if (sortedInput.)
  }
}


const testAnswer = testDifferences.ones * testDifferences.threes
const testAnswer2 = []

const part1 = differences.ones * differences.threes
const part2 = []

console.log("Answer to test part 1: ", testAnswer)
console.log("Answer to part 1: ", part1)


console.log("Answer to test part 2: ", testAnswer2)
console.log("Answer to part 2: ", part2)
