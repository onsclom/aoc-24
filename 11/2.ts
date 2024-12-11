import * as _ from "../aoc-utils"
const a = _.input.split(" ").map(Number)
const blinks = 75

// =====
// iterative solution

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

// =====
// manual cached recursive solution

const cache = new Map<string, number>()

function count1(num: number, blinks: number): number {
  const key = `${num},${blinks}`
  if (cache.has(key)) return cache.get(key)!
  if (blinks === 0) return 1
  if (num === 0) return count1(1, blinks - 1)
  if (num.toString().length % 2 === 0) {
    const half = num.toString().length / 2
    const left = Number(num.toString().slice(0, half))
    const right = Number(num.toString().slice(half))
    const result = count1(left, blinks - 1) + count1(right, blinks - 1)
    cache.set(key, result)
    return result
  }
  const result = count1(num * 2024, blinks - 1)
  cache.set(key, result)
  return result
}

_.tap(_.sum(a.map((num) => count1(num, blinks))))

// =====
// cached recursive solution w/ utility

const count2 = _.cached((num: number, blinks: number): number => {
  if (blinks === 0) return 1
  if (num === 0) return count2(1, blinks - 1)
  if (num.toString().length % 2 === 0) {
    const half = num.toString().length / 2
    const left = Number(num.toString().slice(0, half))
    const right = Number(num.toString().slice(half))
    return count2(left, blinks - 1) + count2(right, blinks - 1)
  }
  return count2(num * 2024, blinks - 1)
})

_.tap(_.sum(a.map((num) => count2(num, blinks))))
