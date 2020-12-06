fs = require('fs')

const input = fs.readFileSync('06-input', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  return data
});

const testInput = fs.readFileSync('06-input-test', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  return data
});

function intersection(set1, set2) {
  return new Set(
    [...set1].filter(x => set2.has(x)))
}

const groupAndStripResponses = (inputIn) => inputIn.split("\n\n").map(item => item.replace(/\n/g, ""))
const groupAndSplitResponses = (inputIn) => inputIn.split("\n\n").map(item => item.split("\n"))
const countUnique = (response) => new Set(response.split("")).size;

const countCommon = (response) => {
  let overlaps = new Set(response[0])
  for (let i = 0; i < response.length - 1; i++) {
    overlaps = intersection(overlaps, new Set(response[i + 1]))
  }
  return overlaps.size
}
console.log(groupAndSplitResponses(testInput).map(item => countCommon(item)))
const testAnswer = groupAndStripResponses(testInput).map(group => countUnique(group)).reduce((a, b) => a + b)
const testAnswer2 = groupAndSplitResponses(testInput).map(item => countCommon(item)).reduce((a, b) => a + b)

const part1 = groupAndStripResponses(input).map(group => countUnique(group)).reduce((a, b) => a + b)
const part2 = groupAndSplitResponses(input).map(item => countCommon(item)).reduce((a, b) => a + b)

console.log("Answer to test part 1: ", testAnswer)
console.log("Answer to part 1: ", part1)


console.log("Answer to test part 2: ", testAnswer2)
console.log("Answer to part 2: ", part2)
