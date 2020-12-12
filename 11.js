fs = require('fs')

const input = fs.readFileSync('11-input', 'utf8', function (err, data) {
  if (err) {
    e
    return console.log(err);
  }
  return data
});

const testInput = fs.readFileSync('11-input-test', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  return data
});

function countNeighbours({ x, y, input }) {
  if (input[y][x] === ".") {
    return "."
  }
  let neighbours = [
    [-1, -1], [0, -1], [1, -1],
    [-1, 0], [1, 0],
    [-1, 1], [0, 1], [1, 1]
  ]

  return neighbours
    .filter(([h, j]) => h + y >= 0
      && h + y < input.length
      && j + x >= 0).map(([h, j]) => input[y + h][x + j] === "#" ? 1 : 0).reduce((a, c) => a + c)
}

const preparedTestInput = testInput.split("\n").map(item => item.split(""))

function getNewGrid(input) {
  const newGrid = Array(input.length).fill(Array(input[0].length))
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
      const numOfNeighbours = countNeighbours({ x: j, y: i, input })
      if (input[i][j] === "L" && numOfNeighbours === 0) {
        newGrid[i][j] = "#"
      } else if (input[i][j] === "#" && numOfNeighbours >= 4) {
        newGrid[i][j] = "L"
      } else {
        newGrid[i][j] = input[i][j]
      }
      // console.log({ numOfNeighbours, input: input[i][j], output: newGrid[i][j] })
    }
    return newGrid
  }
}
function findStableGrid(input) {
  let previousGrid = []
  let currentGrid = input
  let equal = false
  while (!equal) {
    previousGrid = currentGrid
    currentGrid = getNewGrid(previousGrid)
    equal = previousGrid.join("").replace(/,/g, "") === currentGrid.join("").replace(/,/g, "")
  }
  return currentGrid
}

console.log(findStableGrid(preparedTestInput).join("").replace(/,/g, ""))

const testAnswer = []
const testAnswer2 = []

const part1 = []
const part2 = []

console.log("Answer to test part 1: ", testAnswer)
console.log("Answer to part 1: ", part1)


console.log("Answer to test part 2: ", testAnswer2)
console.log("Answer to part 2: ", part2)
