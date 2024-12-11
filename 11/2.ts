import * as _ from "../aoc-utils"
const a = _.input.split(" ").map(Number)

const blinks = 75
let cur = _.count(a)

_.range(blinks).forEach(() => {
  const newCount = new Map<number, number>()
  for (const num of cur.keys()) {
    const amount = cur.get(num)!
    if (num === 0) {
      newCount.set(1, (newCount.get(1) || 0) + amount)
    } else if (num.toString().length % 2 === 0) {
      const half = num.toString().length / 2
      const left = Number(num.toString().slice(0, half))
      const right = Number(num.toString().slice(half))
      newCount.set(left, (newCount.get(left) || 0) + amount)
      newCount.set(right, (newCount.get(right) || 0) + amount)
    } else {
      newCount.set(num * 2024, (newCount.get(num * 2024) || 0) + amount)
    }
  }
  cur = newCount
})

_.tap(_.sum([...cur.values()]))
