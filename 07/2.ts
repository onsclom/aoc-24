import * as _ from "../aoc-utils"

const opOptions = ["+", "*", "|"]
const answer = _.input
  .split("\n")
  .map((line) => line.split(": "))
  .map(([answer, nums]) => ({
    answer: Number(answer),
    nums: nums.split(" ").map(Number),
  }))
  .filter((line) => {
    const opsCount = line.nums.length - 1
    for (let i = 0; i < opOptions.length ** opsCount; i++) {
      const binary = i
        .toString(opOptions.length)
        .padStart(opsCount, "0")
        .split("")
      const ops = binary.map((bit) => opOptions[Number(bit)])
      const result = line.nums.reduce((acc, curr, i) => {
        if (ops[i - 1] === "+") {
          return acc + curr
        } else if (ops[i - 1] === "*") {
          return acc * curr
        }
        return Number(String(acc) + String(curr))
      })
      if (result === line.answer) {
        return true
      }
    }
    return false
  })

_.tap(answer.reduce((acc, curr) => acc + curr.answer, 0))
