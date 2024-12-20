import * as _ from "../aoc-utils"

const a = _.input.split("\n").map((line) => line.split(""))

const sy = a.findIndex((row) => row.includes("S"))
const sx = a[sy].indexOf("S")

const ey = a.findIndex((row) => row.includes("E"))
const ex = a[ey].indexOf("E")

function findFastestTime() {
  const queue = [{ x: sx, y: sy, moves: 0, path: [{ x: sx, y: sy }] }]
  const seen = new Set<string>(`${sx},${sy}`)
  // first see how long to solve without cheats
  while (queue.length) {
    const cur = queue.shift()!
    for (const move of _.cardinals) {
      const tx = cur.x + move[0]
      const ty = cur.y + move[1]
      if (seen.has(`${tx},${ty}`)) {
        continue
      }
      seen.add(`${tx},${ty}`)
      if (tx < 0 || ty < 0 || tx >= a[0].length || ty >= a.length) {
        continue
      }
      if (a[ty][tx] === "#") {
        continue
      }
      if (tx === ex && ty === ey) {
        return [...cur.path, { x: tx, y: ty }]
      }
      // queue.push({ x: tx, y: ty, moves: cur.moves + 1 })
      queue.push({
        x: tx,
        y: ty,
        moves: cur.moves + 1,
        path: [...cur.path, { x: tx, y: ty }],
      })
    }
  }
  throw new Error("no path found")
}

// console.log(path)

const fastestPath = findFastestTime()
// console.log(fastestPath.length)

const mustSave = 100 // change to 100
let shortcuts = []
for (let i = 0; i < fastestPath.length; i++) {
  for (let j = i; j < fastestPath.length; j++) {
    // attempt a shortcut from i to j
    const p1 = fastestPath[i]
    const p2 = fastestPath[j]
    const manhattan = Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y)
    const saves = j - i
    // 20 second cheats allowed
    if (manhattan > 20) {
      continue
    }
    const totalSaved = saves - manhattan
    if (totalSaved >= mustSave) {
      // shortcuts++
      shortcuts.push(totalSaved)
    }
  }
}

_.tap(shortcuts.length)
