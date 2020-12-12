fs = require('fs')

const input = fs.readFileSync('12-input', 'utf8', function (err, data) {
  if (err) {
    e
    return console.log(err);
  }
  return data
});

const testInput = fs.readFileSync('12-input-test', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  return data
});


function findLastPosition(input, initialPosition) {
  let position = initialPosition
  console.log(position)
  let direction = 90
  input.forEach(instruction => {
    const { directionChange = 0, positionChange = [0, 0] } = parseInstruction(instruction, direction)
    position[0] = position[0] + positionChange[0]
    position[1] = position[1] + positionChange[1]
    direction += directionChange
    direction = (360 + direction) % 360
  })
  return position
}

function parseInstruction(instruction, direction) {
  const splitInstruction = instruction.split("")
  const [rule, amount] = [splitInstruction.shift(), parseInt(splitInstruction.join(""))]
  let positionChange = [0, 0]
  let directionChange = 0
  switch (rule) {
    case "N":
      positionChange = [0, amount]
      break;
    case "S":
      positionChange = [0, -1 * amount]
      break;
    case "E":
      positionChange = [amount, 0]
      break;
    case "W":
      positionChange = [-1 * amount, 0]
      break;
    case "L":
      directionChange = amount * -1
      break;
    case "R":
      directionChange = amount;
      break;
    case "F":
      positionChange = parseDirection({ amount, direction })
      break;
    default:
      break
  }
  return { positionChange, directionChange }
}

function parseDirection({ amount, direction }) {
  switch (parseInt(direction)) {
    case 0:
    case 360:
      return [0, amount]
    case 90:
      return [amount, 0]
    case 180:
      return [0, -1 * amount]
    case 270:
      return [-1 * amount, 0]
    default:
      return []

  }
}


console.log(findLastPosition(testInput.split("\n")), [10, 1])
const testAnswer = findLastPosition(testInput.split("\n")).reduce((a, c) => Math.abs(a) + Math.abs(c))
const testAnswer2 = []

const part1 = findLastPosition(input.split("\n")).reduce((a, c) => Math.abs(a) + Math.abs(c))
const part2 = []

console.log("Answer to test part 1: ", testAnswer)
console.log("Answer to part 1: ", part1)


console.log("Answer to test part 2: ", testAnswer2)
console.log("Answer to part 2: ", part2)
