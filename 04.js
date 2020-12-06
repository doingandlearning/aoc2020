fs = require('fs')

const input = fs.readFileSync('04-input', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  return data
});

const cleanedData = input.split("\n\n").map(item => item.replace(/\n/g, " "))

// byr (Birth Year)
// iyr (Issue Year)
// eyr (Expiration Year)
// hgt (Height)
// hcl (Hair Color)
// ecl (Eye Color)
// pid (Passport ID)
// cid (Country ID) - don't care about this for part 1
function validatePassport(passport) {
  const keys = ["byr:", "iyr:", "eyr:", "hgt:", "hcl:", "ecl:", "pid:"]
  const tests = keys.map(key => passport.includes(key)).filter(item => !item)
  return tests.length > 0 ? false : true;
}

function testFields(passport) {
  const separated = passport.split(" ")
  const tests = separated.map(field => testField(field)).filter(item => !item)
  console.log(tests)
  return tests.length > 0 ? false : true;
}

function testField(field) {
  const kvSplit = field.split(":")
  switch (kvSplit[0]) {
    case "byr":
      if (kvSplit[1].length !== 4 || kvSplit[1] < 1920 || kvSplit[1] > 2002) {
        return false
      }
      return true
    case "iyr":
      if (kvSplit[1].length !== 4 || kvSplit[1] < 2010 || kvSplit[1] > 2020) {
        return false
      }
      return true
    case "eyr":
      if (kvSplit[1].length !== 4 || kvSplit[1] < 2020 || kvSplit[1] > 2030) {
        return false
      }
      return true
    case "hgt":
      const height = kvSplit[1].substr(0, kvSplit[1].length - 2)

      if (!["in", "cm"].includes(kvSplit[1].substr(kvSplit[1].length - 2))) {
        return false
      }
      if (kvSplit[1].endsWith("in") && (height < 59 || height > 76)) {
        return false
      }
      if (kvSplit[1].endsWith("cm") && (height < 150 || height > 193)) {
        return false
      }
      return true
    case "hcl":
      if (!kvSplit[1].startsWith("#") || kvSplit[1].substr(1).length !== 6 || kvSplit[1].replace(/[#a-f0-9]/gi, "").length !== 0) {
        return false
      }
      return true
    case "ecl":
      const colours = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]
      return colours.includes(kvSplit[1])
    case "pid":
      if (kvSplit[1].length !== 9 || kvSplit[1].replace(/[0-9]/g, "").length !== 0) {
        return false
      }
      return true
    default:
      return true
  }
}

const part1 = cleanedData.filter(passport => validatePassport(passport)).length
const part2 = cleanedData.filter(passport => validatePassport(passport)).filter(passport => testFields(passport)).length
console.log("Answer to part 1: ", part1)
console.log("Answer to part 2: ", part2)
// console.log(testField("hgt:190"))

