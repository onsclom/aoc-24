// TODO: recreate part 1
// TODO: printing should copy thing to my clipboard!

import * as _ from "../aoc-utils"

const grid = _.input.split("\n").map((line) => line.split(""))

const dirs = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
]

let cur = [0, 0]
for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[0].length; x++) {
    if (grid[y][x] === "^") {
      cur = [x, y]
    }
  }
}
const start = cur.slice()

const width = grid[0].length
const height = grid.length
let loops = 0

for (let i = 0; i < width * height; i++) {
  console.log(i)
  let dirNum = 0
  cur = start.slice()

  const obstacleX = i % width
  const obstacleY = Math.floor(i / width)
  const obstacleItem = grid[obstacleY][obstacleX]

  if (obstacleItem !== ".") {
    continue
  } else {
    grid[obstacleY][obstacleX] = "#"
  }

  const seenPosDir = new Set<string>()
  while (true) {
    if (seenPosDir.has(cur.join(",") + "," + (dirNum % 4))) {
      loops++
      break
    }
    seenPosDir.add(cur.join(",") + "," + (dirNum % 4))

    const curDir = dirs[dirNum % dirs.length]
    const target = [cur[0] + curDir[0], cur[1] + curDir[1]]

    const targetItem = grid[target[1]]?.[target[0]]
    if (targetItem === undefined) {
      break
    }

    if (targetItem === "#") {
      dirNum++
      continue
    } else {
      cur[0] += curDir[0]
      cur[1] += curDir[1]
    }
  }

  grid[obstacleY][obstacleX] = "."
}

_.tap(loops)
