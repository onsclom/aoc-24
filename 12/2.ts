// TODO: factor out pt 1

import * as _ from "../aoc-utils"

const inGroup = new Set<string>()
const groups = [] as {
  points: { x: number; y: number }[]
  perimeter: number
  area: number
}[]

const a = _.input.split("\n").map((line) => line.split(""))

const width = a[0].length
const height = a.length

/*  the price of fence required for a region is found by multiplying that region's area by its perimeter. The total price of fencing all regions on a map is found by adding together the price of fence for every region on the map.*/
for (const i of _.range(width * height)) {
  const x = i % width
  const y = Math.floor(i / width)
  const point = { x, y }

  if (inGroup.has(`${x},${y}`)) {
    continue
  }

  const curLetter = a[y][x]
  // get all the points in the group
  inGroup.add(`${x},${y}`)
  const curGroup = [point] as { x: number; y: number }[]
  const queue = [point]
  while (queue.length) {
    const cur = queue.shift()!
    for (const [dx, dy] of _.cardinals) {
      const nx = cur.x + dx
      const ny = cur.y + dy
      const newLetter = a[ny]?.[nx]
      if (!newLetter) continue
      if (newLetter === curLetter && !inGroup.has(`${nx},${ny}`)) {
        inGroup.add(`${nx},${ny}`)
        curGroup.push({ x: nx, y: ny })
        queue.push({ x: nx, y: ny })
      }
    }
  }

  let corners = 0
  const groupSet = new Set(curGroup.map(({ x, y }) => `${x},${y}`))
  curGroup.forEach(({ x, y }) => {
    // check for corners

    // inner corners
    if (
      groupSet.has(`${x + 1},${y}`) &&
      groupSet.has(`${x},${y - 1}`) &&
      !groupSet.has(`${x + 1},${y - 1}`)
    )
      corners++
    if (
      groupSet.has(`${x + 1},${y}`) &&
      groupSet.has(`${x},${y + 1}`) &&
      !groupSet.has(`${x + 1},${y + 1}`)
    )
      corners++
    if (
      groupSet.has(`${x - 1},${y}`) &&
      groupSet.has(`${x},${y - 1}`) &&
      !groupSet.has(`${x - 1},${y - 1}`)
    )
      corners++
    if (
      groupSet.has(`${x - 1},${y}`) &&
      groupSet.has(`${x},${y + 1}`) &&
      !groupSet.has(`${x - 1},${y + 1}`)
    )
      corners++

    // outer corners
    if (!groupSet.has(`${x + 1},${y}`) && !groupSet.has(`${x},${y - 1}`))
      corners++
    if (!groupSet.has(`${x + 1},${y}`) && !groupSet.has(`${x},${y + 1}`))
      corners++
    if (!groupSet.has(`${x - 1},${y}`) && !groupSet.has(`${x},${y - 1}`))
      corners++
    if (!groupSet.has(`${x - 1},${y}`) && !groupSet.has(`${x},${y + 1}`))
      corners++
  })

  const area = curGroup.length
  const perimeter = corners

  console.log({
    curLetter,
    // sideCount,
    area,
    perimeter,
  })

  groups.push({
    points: curGroup,
    perimeter,
    area,
  })
}

// _.tap(a)
_.tap(groups.map((g) => g.area * g.perimeter).reduce((a, b) => a + b, 0))
