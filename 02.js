fs = require('fs')

const input = fs.readFileSync('02-input', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  return data
});

const data = input.split("\n")

function validPassword(item) {
  // 10-11 h: pghprtcjjjhshkw
  const input = item.split(":")
  const rule = input[0].split(" ")
  const limits = rule[0].split("-")

  const password = input[1].trim()
  const letter = rule[1]
  const min = limits[0]
  const max = limits[1]

  const occurs = password.split(letter).length - 1

  if (occurs < min) return false
  if (occurs > max) return false
  return true
}

function validPassword2(item) {
  // 10-11 h: pghprtcjjjhshkw
  const input = item.split(":")
  const rule = input[0].split(" ")
  const limits = rule[0].split("-")

  const password = input[1].trim()
  const letter = rule[1]
  const first = limits[0]
  const second = limits[1]

  const test1 = password[parseInt(first) - 1] !== letter
  const test2 = password[parseInt(second) - 1] !== letter
  if (test1 && test2) return false
  if (!test1 && !test2) return false
  if (test1 || test2) return true
}

console.log(validPassword2("1-3 a: abcde")) // true
console.log(validPassword2("1-3 b: cdefg")) // false
console.log(validPassword2("2-9 c: ccccccccc")) // false


const filteredPasswords = data.filter(item => validPassword2(item))

console.log(filteredPasswords.length)