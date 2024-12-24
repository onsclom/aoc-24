import * as _ from "../aoc-utils"

const a = _.input

const dirKeypad = ` ^A
<v>`
  .split("\n")
  .map((l) => l.split(""))

const numKeypad = `
789
456
123
 0A
`
  .trim()
  .split("\n")
  .map((l) => l.split(""))

let dirRobot1 = { x: 2, y: 0 }
let dirRobot2 = { x: 2, y: 0 }
let numRobot = { x: 2, y: 3 }

let sum = 0
a.split("\n").forEach((line) => {
  console.log(line)

  const presses = calcPresses(
    {
      r1: dirRobot1,
      r2: dirRobot2,
      num: numRobot,
      output: "",
      presses: 0,
    },
    line,
  )
  // console.log(presses)

  const numberPart = +line.match(/\d+/g)![0]
  sum += numberPart * presses
})
console.log(sum)

function calcPresses(
  state: {
    r1: { x: number; y: number }
    r2: { x: number; y: number }
    num: { x: number; y: number }
    output: string
    presses: number
  },
  goal: string,
) {
  const queue = [state]
  const seen = new Set<string>()

  function addState(state: (typeof queue)[0]) {
    const key = `${state.r1.x},${state.r1.y},${state.r2.x},${state.r2.y},${state.num.x},${state.num.y},${state.output}`
    if (seen.has(key)) return
    seen.add(key)
    queue.push({
      ...state,
      presses: state.presses + 1,
    })
  }

  while (queue.length > 0) {
    const cur = queue.shift()!

    // try 4 dirs
    for (const dir of _.cardinals) {
      const r1x = cur.r1.x + dir[0]
      const r1y = cur.r1.y + dir[1]
      const atR1 = dirKeypad[r1y]?.[r1x] ?? " "
      if (atR1 === " ") continue
      addState({
        ...cur,
        r1: { x: r1x, y: r1y },
      })
    }

    // try press "A"
    const atR1 = dirKeypad[cur.r1.y]?.[cur.r1.x] ?? " "
    if (atR1 === " ") continue
    if (atR1 === "A") {
      const atR2 = dirKeypad[cur.r2.y]?.[cur.r2.x] ?? " "
      if (atR2 === " ") continue
      if (atR2 === "A") {
        const atNum = numKeypad[cur.num.y]?.[cur.num.x] ?? " "
        if (atNum === " ") continue
        const newOutput = cur.output + atNum
        if (newOutput === goal) {
          return cur.presses + 1
        }
        if (goal.startsWith(newOutput)) {
          addState({
            ...cur,
            output: newOutput,
          })
        }
      } else {
        const dir = {
          "^": { x: 0, y: -1 },
          v: { x: 0, y: 1 },
          "<": { x: -1, y: 0 },
          ">": { x: 1, y: 0 },
        }[atR2]!
        const nx = cur.num.x + dir.x
        const ny = cur.num.y + dir.y
        const atNum = numKeypad[ny]?.[nx] ?? " "
        if (atNum === " ") continue
        addState({
          ...cur,
          num: { x: nx, y: ny },
        })
      }
    }
    // atR1 is dir
    else {
      const dir = {
        "^": { x: 0, y: -1 },
        v: { x: 0, y: 1 },
        "<": { x: -1, y: 0 },
        ">": { x: 1, y: 0 },
      }[atR1]!
      const r2y = cur.r2.y + dir.y
      const r2x = cur.r2.x + dir.x
      const atR2 = dirKeypad[r2y]?.[r2x] ?? " "
      if (atR2 === " ") continue
      addState({
        ...cur,
        r2: { x: r2x, y: r2y },
      })
    }
  }

  throw new Error("failed making keycode")
}
