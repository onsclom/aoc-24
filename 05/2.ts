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

const invalidRows = rest
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
          return true
        }
      }
    }
    return false
  })

const sortedInvalidRows = invalidRows.map((row) =>
  row.toSorted((left, right) => {
    // -1 0 1
    const leftRule = ruleMap.get(left)
    const rightIsInLeftsRule = leftRule?.includes(right)
    if (rightIsInLeftsRule) {
      return -1
    }
    return 1
  }),
)

const answer = sortedInvalidRows
  .map((row) => row[Math.floor(row.length / 2)])
  .reduce((acc, curr) => acc + curr, 0)

_.tap(answer)
