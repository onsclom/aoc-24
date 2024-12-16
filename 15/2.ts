import * as _ from "../aoc-utils"

const [a, b] = _.input.split("\n\n")
const map = a.split("\n").map((line) =>
  line
    .split("")
    .map(
      (cell) =>
        ({
          "#": "##",
          ".": "..",
          O: "[]",
          "@": "@.",
        })[cell]!,
    )
    .join("")
    .split(""),
)

let py = map.findIndex((line) => line.includes("@"))
let px = map[py].indexOf("@")
const grid = map.map((line) => line.map((cell) => (cell === "#" ? "#" : ".")))

const walls = new Set<string>()
grid.forEach((row, y) => {
  row.forEach((cell, x) => {
    if (cell === "#") {
      walls.add(`${x},${y}`)
    }
  })
})

const boulders = [] as { x: number; y: number }[]
map.forEach((row, y) => {
  row.forEach((cell, x) => {
    if (cell === "[") {
      boulders.push({ x, y })
    }
  })
})

const moves = b
  .split("\n")
  .join("")
  .split("")
  .map(
    (move) =>
      ({
        v: { x: 0, y: 1 },
        "<": { x: -1, y: 0 },
        ">": { x: 1, y: 0 },
        "^": { x: 0, y: -1 },
      })[move]!,
  )

moves.forEach((move, i) => {
  // print full map/grid
  const newGrid: string[][] = grid.map((row) => row.map((cell) => cell))
  boulders.forEach((boulder) => {
    newGrid[boulder.y][boulder.x] = "["
    newGrid[boulder.y][boulder.x + 1] = "]"
  })
  newGrid[py][px] = "@"

  const boulderMap = new Map(
    boulders.map((boulder) => [`${boulder.x},${boulder.y}`, boulder]),
  )
  const tx = px + move.x
  const ty = py + move.y

  // attempt move, but if illegal then bail
  if (walls.has(`${tx},${ty}`)) {
    return
  }

  if (boulderMap.has(`${tx},${ty}`) || boulderMap.has(`${tx - 1},${ty}`)) {
    const start =
      boulderMap.get(`${tx},${ty}`) || boulderMap.get(`${tx - 1},${ty}`)
    if (!start) throw new Error("no boulder")
    const queue = [start]
    const handledBoulders = new Set([start])
    let shouldBail = false
    while (queue.length) {
      const cur = queue.shift()!
      const newPos = { x: cur.x + move.x, y: cur.y + move.y }
      if (
        walls.has(`${newPos.x},${newPos.y}`) ||
        walls.has(`${newPos.x + 1},${newPos.y}`)
      ) {
        shouldBail = true
        break
      }

      const newBoulderPos = { x: cur.x + move.x, y: cur.y + move.y }
      const b1 = boulderMap.get(`${newBoulderPos.x},${newBoulderPos.y}`)
      const b2 = boulderMap.get(`${newBoulderPos.x + 1},${newBoulderPos.y}`)
      const b3 = boulderMap.get(`${newBoulderPos.x - 1},${newBoulderPos.y}`)
      if (b1 && !handledBoulders.has(b1)) {
        queue.push(b1)
        handledBoulders.add(b1)
      }
      if (b2 && !handledBoulders.has(b2)) {
        queue.push(b2)
        handledBoulders.add(b2)
      }
      if (b3 && !handledBoulders.has(b3)) {
        queue.push(b3)
        handledBoulders.add(b3)
      }
    }
    if (shouldBail) {
      return
    }
    // legal move... move boulders
    handledBoulders.forEach((boulder) => {
      boulder.x += move.x
      boulder.y += move.y
    })
    px = tx
    py = ty
  } else {
    px = tx
    py = ty
  }
})

// print full map/grid
const newGrid: string[][] = grid.map((row) => row.map((cell) => cell))
boulders.forEach((boulder) => {
  newGrid[boulder.y][boulder.x] = "["
  newGrid[boulder.y][boulder.x + 1] = "]"
})
newGrid[py][px] = "@"
newGrid.forEach((row) => _.tap(row.join("")))

let ans = 0
boulders.forEach((boulder) => {
  ans += boulder.y * 100 + boulder.x
})

_.tap(ans)
