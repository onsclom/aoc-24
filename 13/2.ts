import * as _ from "../aoc-utils"

const a = _.input
  .split("\n\n")
  .map((part) => {
    const regex = /(\d+)/g
    const matches = part.matchAll(regex)
    return [...matches].map((match) => match[0]).map(Number)
  })
  .map((a) => ({
    ax: a[0],
    ay: a[1],
    bx: a[2],
    by: a[3],
    px: a[4] + 10000000000000,
    py: a[5] + 10000000000000,
  }))
  .map((machine, i) => {
    console.log(i)
    // px = ax * a + bx * b
    // py = ay * a + by * b

    // px = ax * a + bx * b
    // px - ax * a = bx * b
    // (px - ax * a) / bx = b

    // py = ay * a + by * ((px - ax * a) / bx)
    // py = ay * a + (by * px / bx) - (by * ax * a / bx)
    // py = ay * a - (by * ax * a / bx) + (by * px / bx)
    // py = a * (ay - (by * ax * / bx)) + (by * px / bx)
    // py - (by * px / bx) = a * (ay - (by * ax * / bx))
    // (py - (by * px / bx)) / (ay - (by * ax * / bx)) = a
    const [px, py, ax, ay, bx, by] = [
      machine.px,
      machine.py,
      machine.ax,
      machine.ay,
      machine.bx,
      machine.by,
    ]
    const a = (py - (by * px) / bx) / (ay - (by * ax) / bx)
    const b = (px - ax * a) / bx
    // check that rounded a and b work
    const ra = Math.round(a)
    const rb = Math.round(b)
    const rAnswer = {
      x: ax * ra + bx * rb,
      y: ay * ra + by * rb,
    }
    if (rAnswer.x === px && rAnswer.y === py) {
      return ra * 3 + rb
    }
    return Infinity
  })
  .filter((a) => a !== Infinity)

_.tap(_.sum(a))
