export const input = (await Bun.file("./input.txt").text()).trim()
export const test = (await Bun.file("./test.txt").text()).trim()
export const letters = "abcdefghijklmnopqrstuvwxyz".split("")
export const digits = "0123456789".split("")

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
