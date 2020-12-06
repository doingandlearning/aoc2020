fs = require('fs')

const input = fs.readFileSync('01-input', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  return data
});

const data = input.split("\n")
const intData = data.map(item => parseInt(item))
function part1() {
  intData.forEach(element => {
    if (intData.includes(2020 - element)) {
      return element * (2020 - element)
    }
  });
}

function part2() {
  intData.forEach(element => {
    const remaining = 2020 - element
    const filteredIntData = intData.filter(number => number < remaining)
    filteredIntData.forEach(item => {
      if (filteredIntData.includes(remaining - item)) {
        return element * item * (remaining - item)
      }
    })
  });
}

module.exports = { part1, part2 }