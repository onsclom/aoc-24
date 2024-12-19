import * as _ from "../aoc-utils"

const [a, b] = _.input.split("\n\n")
const patterns = a.split(", ").map((pattern) => pattern.split(""))
const todo = b.split("\n").map((line) => line.split(""))

const cache = new Map<string, number>()
function possiblePatterns(remaining: string[]) {
  const curString = remaining.join("")
  if (cache.has(curString)) {
    return cache.get(curString)!
  }
  let possible = 0
  for (const pattern of patterns) {
    const patternString = pattern.join("")
    if (curString.startsWith(patternString)) {
      const newRemaining = remaining.slice(pattern.length)
      if (newRemaining.length === 0) {
        possible++
      } else {
        possible += possiblePatterns(newRemaining)
      }
    }
  }
  cache.set(curString, possible)
  return possible
}

let possible = 0
todo.forEach((line, i) => {
  console.log(i)
  possible += possiblePatterns(line)
})

console.log(possible)
