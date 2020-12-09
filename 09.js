const { start } = require('repl');

fs = require('fs')

const input = fs.readFileSync('09-input', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  return data
});

const testInput = fs.readFileSync('09-input-test', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  return data
});

const validNumber = ({ number, key }) => {
  return !key.map(item => key.includes(number - item)).filter(item => item).length > 0
}

const findRange = ({ target, sequence }) => {
  let startIndex = 0
  let endIndex = 0
  let sum = sequence[0]

  while (sum !== target) {
    endIndex += 1
    sum = sequence.slice(startIndex, endIndex).reduce((a, c) => a + c, 0)
    if (sum > target) {
      startIndex += 1
      endIndex = startIndex
    }
  }
  const targetSequence = sequence.slice(startIndex, endIndex)
  return Math.max(...targetSequence) + Math.min(...targetSequence)

}

findRange({ target: 127, sequence: testInput.split("\n").map(item => parseInt(item)) })

const testAnswer = testInput.split("\n").slice(5).filter((item, idx) => validNumber({ number: item, key: testInput.split("\n").slice(idx, idx + 5).map(item => parseInt(item)) }))
const testAnswer2 = findRange({ target: 127, sequence: testInput.split("\n").map(item => parseInt(item)) })

const part1 = input.split("\n").slice(25).filter((item, idx) => validNumber({ number: item, key: input.split("\n").slice(idx, idx + 25).map(item => parseInt(item)) }))
const part2 = findRange({ target: 18272118, sequence: input.split("\n").map(item => parseInt(item)) })

console.log("Answer to test part 1: ", testAnswer)
console.log("Answer to part 1: ", part1)


console.log("Answer to test part 2: ", testAnswer2)
console.log("Answer to part 2: ", part2)
