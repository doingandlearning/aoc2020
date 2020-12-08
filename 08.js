fs = require('fs')

const input = fs.readFileSync('08-input', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  return data
});

const testInput = fs.readFileSync('08-input-test', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  return data
});

const math_it_up = {
  '+': function (x, y) { return x + y },
  '-': function (x, y) { return x - y }
};

function runCode(input) {
  const visitedValues = []
  let currentIndex = 0
  let accumulator = 0
  while (!visitedValues.includes(currentIndex) || currentIndex > input.length) {
    console.log(input[currentIndex])
    const value = input[currentIndex].split(" ")
    visitedValues.push(currentIndex)
    switch (value[0]) {
      case "nop":
        currentIndex += 1
        break;
      case "acc":
        currentIndex += 1
        accumulator = math_it_up[value[1][0]](accumulator, parseInt(value[1].substr(1)))
        break;
      case "jmp":
        currentIndex = math_it_up[value[1][0]](currentIndex, parseInt(value[1].substr(1)))
        break;
      default:
        break
    }
  }
  return accumulator

}

const testAnswer = runCode(testInput.split("\n"))
const testAnswer2 = []

const part1 = runCode(input.split("\n"))
const part2 = []

console.log("Answer to test part 1: ", testAnswer)
console.log("Answer to part 1: ", part1)


console.log("Answer to test part 2: ", testAnswer2)
console.log("Answer to part 2: ", part2)
