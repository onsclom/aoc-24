import * as _ from "../aoc-utils"

const a = _.input.split("\n").map((line) => line.split("").map(Number))

let trailHeadPoints = 0
a.forEach((row, y) => {
  row.forEach((char, x) => {
    if (char === 0) {
      const queue = [{ x, y }]
      let seen = new Set<string>(JSON.stringify(queue[0]))
      while (queue.length) {
        const curPos = queue.shift()!
        const curNum = a[curPos.y][curPos.x]
        for (const dir of _.cardinals) {
          const [dx, dy] = dir
          const targetX = curPos.x + dx
          const targetY = curPos.y + dy
          const target = a[targetY]?.[targetX]
          if (target === undefined) {
            continue
          }
          if (target === curNum + 1) {
            if (seen.has(JSON.stringify({ x: targetX, y: targetY }))) {
              continue
            }
            seen.add(JSON.stringify({ x: targetX, y: targetY }))
            if (target === 9) {
              trailHeadPoints++
              continue
            }
            queue.push({ x: targetX, y: targetY })
          }
        }
      }
    }
  })
})

_.tap(trailHeadPoints)
