import clipboard from "clipboardy"
import { readFileSync } from "fs"

export const input = readFileSync("./input.txt", "utf8").trim()
export const test = readFileSync("./test.txt", "utf8").trim()
export const letters = "abcdefghijklmnopqrstuvwxyz".split("")
export const digits = "0123456789".split("")
export const cardinals = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
]
export const diagonals = [
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
]
export const allDirections = [...cardinals, ...diagonals]

export function range(a: number, b?: number): number[] {
  if (b === undefined) {
    return [...Array(a).keys()]
  }
  return [...Array(b - a).keys()].map((i) => i + a)
}

export function sum(arr: number[]): number {
  return arr.reduce((acc, curr) => acc + curr, 0)
}

export function tap<T>(a: T) {
  console.log(a)
  clipboard.writeSync(String(a))
  return a
}

export function count<T>(arr: T[]) {
  return arr.reduce((acc, val) => {
    acc.set(val, (acc.get(val) || 0) + 1)
    return acc
  }, new Map<T, number>())
}

export function sorted(nums: number[]) {
  return nums.toSorted((a, b) => a - b)
}

export function permutations<T>(arr: T[]): T[][] {
  if (arr.length === 0) {
    return [[]]
  }
  return arr.flatMap((el, i) => {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)]
    return permutations(rest).map((perm) => [el, ...perm])
  })
}

export function combinations<T>(arr: T[], k: number): T[][] {
  if (k === 0) {
    return [[]]
  }
  if (arr.length === 0) {
    return []
  }
  const [head, ...tail] = arr
  return [
    ...combinations(tail, k - 1).map((comb) => [head, ...comb]),
    ...combinations(tail, k),
  ]
}

export function chunk<T>(arr: T[], size: number): T[][] {
  const chunks = [] as T[][]
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size))
  }
  return chunks
}

export function createCache<Args extends any[], V>(
  fn: (...args: Args) => V,
): (...args: Args) => V {
  const cache = new Map<string, V>()
  return (...args: Args): V => {
    const keyString = JSON.stringify(args) // poor man's deep equality
    if (cache.has(keyString)) {
      return cache.get(keyString)!
    }
    const result = fn(...args)
    cache.set(keyString, result)
    return result
  }
}
