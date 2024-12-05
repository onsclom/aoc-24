import * as _ from "../aoc-utils"

const [rules, rest] = _.input.split("\n\n")

const ruleMap = new Map<number, number[]>()
rules.split("\n").forEach((rule) => {
  const [before, after] = rule.split("|")
  ruleMap.set(Number(before), [
    ...(ruleMap.get(Number(before)) || []),
    Number(after),
  ])
})

const answer = rest
  .split("\n")
  .map((row) => row.split(",").map(Number))
  .filter((row) => {
    for (let i = 0; i < row.length; i++) {
      const ruleNum = row[i]
      const rule = ruleMap.get(ruleNum)
      for (let j = i + 1; j < row.length; j++) {
        const afterNum = row[j]
        const valid = rule?.includes(afterNum)
        if (!valid) {
          return false
        }
      }
    }
    return true
  })
  .map((row) => row[Math.floor(row.length / 2)])
  .reduce((acc, curr) => acc + curr, 0)

_.tap(answer)
