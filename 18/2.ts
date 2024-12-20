import * as _ from "../aoc-utils"

let amount = 1024
while (true) {
  const a = _.input
    .split("\n")
    .slice(0, amount)
    .map((line) => line.split(",").map(Number))

  const grid = new Array(71).fill(0).map(() => new Array(71).fill("."))
  // _.tap(grid)

  a.forEach(([x, y]) => {
    grid[y][x] = "#"
  })

  const width = 71
  const height = 71

  const sx = 0
  const sy = 0
  const ex = 70
  const ey = 70

  const queue = [
    {
      x: sx,
      y: sy,
      steps: 0,
    },
  ]

  let runItBack = false
  while (queue.length) {
    const cur = queue.shift()!
    const { x, y, steps } = cur
    if (x === ex && y === ey) {
      amount++
      runItBack = true
      break
    }
    for (const dir of _.cardinals) {
      const tx = x + dir[0]
      const ty = y + dir[1]
      if (tx < 0 || ty < 0 || tx >= width || ty >= height) {
        continue
      }
      if (grid[ty][tx] === "#") {
        continue
      }
      grid[ty][tx] = "#"
      queue.push({ x: tx, y: ty, steps: steps + 1 })
    }
  }

  if (!runItBack) {
    console.log(a.at(-1))
    break
  }
}

// _.tap(a)
