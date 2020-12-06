fs = require('fs')

const input = fs.readFileSync('03-input', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  return data
});

const field = input.split("\n").map(row => row.split("").map(item => item === "." ? 0 : 1))

const fieldWidth = field[0].length
const fieldHeight = field.length

function totalFromSlope(right, down) {
  let answer = 0
  let x = 0
  for (let y = 0; y < fieldHeight; y += down) {
    console.log(x, y)
    answer += field[y][displace(x)]
    if (y + down > fieldHeight) {
      answer += field[fieldHeight - 1][displace(x)]
    }
    x += right
  }
  return answer
}

function totalFromGradient(m, down) {
  let answer = 0
  for (let y = 0; y < fieldHeight; y += down) {
    answer += field[y][displace(y / m)]
    if (y + down > fieldHeight) {
      answer += field[fieldHeight - 1][displace(y / m)]
    }
  }
  return answer

}

function countTrees(slopeDown, slopeRight) {
  let numTrees = 0;
  for (let x = 0, y = 0; y < fieldHeight; x += slopeDown, y += slopeRight) {
    numTrees += field[y][displace(x)]
  }
  return numTrees;
}

// (0,0)
// (3,1)
// (6,2)
// (9,3)

// when down = 1, (right * y, y)
// when down = 2, (y/2, y)

// Right 1, down 1.
// Right 3, down 1. 
// Right 5, down 1.
// Right 7, down 1.
// Right 1, down 2.
// console.log("Answer to part one: ", totalFromSlope(3, 1))

// console.log("Answer to part two: ",
//   totalFromGradient((1), 1) *
//   totalFromGradient((1 / 3), 1) *
//   totalFromGradient((1 / 5), 1) *
//   totalFromGradient((1 / 7), 1) *
//   totalFromGradient((2 / 1), 2)
// )

// console.log(
//   totalFromSlope(1, 1),
//   totalFromSlope(3, 1),
//   totalFromSlope(5, 1),
//   totalFromSlope(7, 1),
//   totalFromSlope(1, 2)
// )

console.log("Answer to part two: ",
  countTrees(1, 1) *
  countTrees(3, 1) *
  countTrees(5, 1) *
  countTrees(7, 1) *
  countTrees(1, 2)
)
// console.log(
//   countTrees(1, 1),
//   countTrees(3, 1),
//   countTrees(5, 1),
//   countTrees(7, 1),
//   countTrees(1, 2)
// )

// console.log(
//   totalFromSlope(1, 1),
//   totalFromSlope(3, 1),
//   totalFromSlope(5, 1),
//   totalFromSlope(7, 1),
//   totalFromSlope(1, 2)
// )

function displace(index) {
  if (index >= fieldWidth) {
    return displace(index - fieldWidth)
  }
  return index
}
