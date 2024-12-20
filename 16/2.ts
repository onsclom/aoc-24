import * as _ from "../aoc-utils"

const a = _.input.split("\n").map((line) => line.split(""))
const sy = a.findIndex((row) => row.includes("S"))
const sx = a[sy].indexOf("S")
const ey = a.findIndex((row) => row.includes("E"))
const ex = a[ey].indexOf("E")

const dirs = [
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 0, y: -1 },
]
let dirNum = 0

const first = {
  x: sx,
  y: sy,
  dir: 0,
  cost: 0,
  onPath: [{ x: sx, y: sy }],
}
const queue = [first]
// const seen = new Set<string>(`${sx},${sy},${0}`)
let min = Infinity

// x,y,dir -> cost
const minSeenScores = new Map<string, number>()

const seats = new Set<string>([`${sx},${sy}`, `${ex},${ey}`])

while (queue.length) {
  console.log(queue.length)
  const cur = queue.shift()!
  if (cur.cost > min) {
    continue
  }
  if (minSeenScores.get(`${cur.x},${cur.y},${cur.dir}`)! < cur.cost) {
    continue
  }

  const tx = cur.x + dirs[cur.dir].x
  const ty = cur.y + dirs[cur.dir].y

  if (tx === ex && ty === ey) {
    min = Math.min(min, cur.cost + 1)
    if (cur.cost + 1 == 78428) {
      // console.log(cur.onPath)
      cur.onPath.forEach(({ x, y }) => {
        seats.add(`${x},${y}`)
      })
    }
    continue
  }

  const newCost = cur.cost + 1
  if (
    a[ty]?.[tx] === "." &&
    (minSeenScores.get(`${tx},${ty},${cur.dir}`) ?? Infinity) >= newCost
  ) {
    minSeenScores.set(`${tx},${ty},${cur.dir}`, newCost)
    queue.push({
      x: tx,
      y: ty,
      dir: cur.dir,
      cost: newCost,
      onPath: [...cur.onPath, { x: tx, y: ty }],
    })
  }

  for (const cw of _.range(1)) {
    const newDir = (cur.dir + cw + 1) % 4
    const tx = cur.x + dirs[newDir].x
    const ty = cur.y + dirs[newDir].y
    const newCost = cur.cost + 1000 * (cw + 1) + 1
    if (
      a[ty]?.[tx] === "." &&
      (minSeenScores.get(`${tx},${ty},${newDir}`) ?? Infinity) >= newCost
    ) {
      minSeenScores.set(`${tx},${ty},${newDir}`, newCost)
      queue.push({
        x: tx,
        y: ty,
        dir: newDir,
        cost: newCost,
        onPath: [...cur.onPath, { x: tx, y: ty }],
      })
    }
  }
  for (const ccw of _.range(1)) {
    const newDir = (cur.dir - ccw - 1 + 4) % 4
    const tx = cur.x + dirs[newDir].x
    const ty = cur.y + dirs[newDir].y
    const newCost = cur.cost + 1000 * (ccw + 1) + 1
    if (
      a[ty]?.[tx] === "." &&
      (minSeenScores.get(`${tx},${ty},${newDir}`) ?? Infinity) >= newCost
    ) {
      minSeenScores.set(`${tx},${ty},${newDir}`, newCost)
      queue.push({
        x: tx,
        y: ty,
        dir: newDir,
        cost: newCost,
        onPath: [...cur.onPath, { x: tx, y: ty }],
      })
    }
  }
}

_.tap(min)
_.tap(seats.size)

// print maze with seats as O
a.forEach((row, y) => {
  row.forEach((cell, x) => {
    if (seats.has(`${x},${y}`)) {
      process.stdout.write("O")
    } else {
      process.stdout.write(cell)
    }
  })
  process.stdout.write("\n")
})

// wrong 86392
