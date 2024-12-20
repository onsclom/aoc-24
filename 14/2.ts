import * as _ from "../aoc-utils"

console.time("runtime")
const a = _.input.split("\n").map((line) =>
  line.split(" ").flatMap((part) => {
    const regex = /(-?\d+)/g
    const matches = part.matchAll(regex)
    return [...matches].flatMap((match) => match[0]).map(Number)
  }),
)

const width = 101
const height = 103

const seconds = 100
const robots = a.map((robot) => ({
  x: robot[0],
  y: robot[1],
  vx: robot[2],
  vy: robot[3],
}))

let i = 0
while (true) {
  robots.forEach((robot) => {
    robot.x += robot.vx
    robot.y += robot.vy
    robot.x = (robot.x + width) % width
    robot.y = (robot.y + height) % height
  })

  const robotSet = new Set(robots.map((robot) => `${robot.x},${robot.y}`))
  const seen = new Set()
  const first = robots[0]
  let queue = [{ x: first.x, y: first.y }]
  while (queue.length) {
    const cur = queue.shift()!
    for (const [dx, dy] of _.allDirections) {
      const nx = cur.x + dx
      const ny = cur.y + dy
      if (seen.has(`${nx},${ny}`)) {
        continue
      }
      const robotExistsAtPoint = robotSet.has(`${nx},${ny}`)
      if (!robotExistsAtPoint) {
        continue
      }
      seen.add(`${nx},${ny}`)
      queue.push({ x: nx, y: ny })
    }
  }
  i++

  if (seen.size > 30) {
    console.log(`FOUND IT AT ${i}`)
    // for (const i of _.range(width * height)) {
    //   const x = i % width
    //   const y = Math.floor(i / width)
    //   const robotOnPoint = robots.find(
    //     (robot) => robot.x === x && robot.y === y,
    //   )
    //   if (robotOnPoint) {
    //     process.stdout.write("X")
    //   } else {
    //     process.stdout.write(".")
    //   }
    //   if (x === width - 1) {
    //     process.stdout.write("\n")
    //   }
    // }
    break
  }
}

console.log({
  w: Math.floor(width / 2),
  h: Math.floor(height / 2),
})
const q1 = {
  x: 0,
  y: 0,
  w: Math.floor(width / 2),
  h: Math.floor(height / 2),
}
const q2 = {
  x: Math.floor(width / 2) + 1,
  y: 0,
  w: Math.floor(width / 2),
  h: Math.floor(height / 2),
}
const q3 = {
  x: 0,
  y: Math.floor(height / 2) + 1,
  w: Math.floor(width / 2),
  h: Math.floor(height / 2),
}
const q4 = {
  x: Math.floor(width / 2) + 1,
  y: Math.floor(height / 2) + 1,
  w: Math.floor(width / 2),
  h: Math.floor(height / 2),
}
const quads = [q1, q2, q3, q4]
let quadCounts = [0, 0, 0, 0]

robots.forEach((robot) => {
  for (const i of _.range(4)) {
    const quad = quads[i]
    if (
      robot.x >= quad.x &&
      robot.x < quad.x + quad.w &&
      robot.y >= quad.y &&
      robot.y < quad.y + quad.h
    ) {
      quadCounts[i]++
    }
  }
})

_.tap(quadCounts.reduce((a, b) => a * b, 1))
