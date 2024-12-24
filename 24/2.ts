import { register } from "module"
import * as _ from "../aoc-utils"

const [a, b] = _.input.split("\n\n").map((l) => l.split("\n"))

const registerMap = new Map<string, Boolean>()
a.forEach((line) => {
  const [register, value] = line.split(": ")
  registerMap.set(register, Boolean(Number(value)))
})

const xAnswer = BigInt(
  parseInt(
    Array.from(registerMap.keys())
      .filter((key) => key.startsWith("x"))
      .toSorted()
      .toReversed()
      .map((key) => registerMap.get(key))
      .map((a) => (a ? 1 : 0))
      .join(""),
    2,
  ),
)

const yAnswer = BigInt(
  parseInt(
    Array.from(registerMap.keys())
      .filter((key) => key.startsWith("y"))
      .toSorted()
      .toReversed()
      .map((key) => registerMap.get(key))
      .map((a) => (a ? 1 : 0))
      .join(""),
    2,
  ),
)

console.log({
  xAnswer,
  yAnswer,
})

let computationMap = new Map<
  string, // register
  {
    reg1: string
    reg2: string
    op: string
  }
>()

b.forEach((line) => {
  const [calc, register] = line.split(" -> ")
  const calcParts = calc.split(" ")
  computationMap.set(register, {
    reg1: calcParts[0],
    reg2: calcParts[2],
    op: calcParts[1],
  })
})

// fill out map...
const swaps = [] as { reg1: string; reg2: string }[]

for (let k = 0; k < 1000; k++) {
  let max = {
    val: 0,
    reg1: "",
    reg2: "",
    bin: "",
  }
  let maxes = []
  const computations = Array.from(computationMap.keys())
  for (let i = 0; i < computations.length; i++) {
    for (let j = i + 1; j < computations.length; j++) {
      const oldComps = new Map(computationMap)

      // do swaps
      swaps.forEach((swap) => {
        const temp = computationMap.get(swap.reg1)
        computationMap.set(swap.reg1, computationMap.get(swap.reg2)!)
        computationMap.set(swap.reg2, temp!)
      })

      // swap i and j in comps
      const temp = computationMap.get(computations[i])
      computationMap.set(computations[i], computationMap.get(computations[j])!)
      computationMap.set(computations[j], temp!)

      computationMap.forEach((_, register) => {
        const res = doComputation(register)
        registerMap.set(register, res)
      })

      const zKeys = Array.from(registerMap.keys())
        .filter((key) => key.startsWith("z"))
        .toSorted()
        .toReversed()

      const zAnswer = parseInt(
        zKeys
          .map((key) => registerMap.get(key))
          .map((a) => (a ? 1 : 0))
          .join(""),
        2,
      )

      const bin = zKeys
        .map((key) => registerMap.get(key))
        .map((a) => (a ? 1 : 0))

      const count = _.count(bin)
      const ones = count.get(1)!
      if (ones > max.val) maxes = []
      if (ones >= max.val) {
        max = {
          val: ones,
          reg1: computations[i],
          reg2: computations[j],
          bin: bin.join(""),
        }
        maxes.push(max)
      }

      // reset computationMap
      computationMap = oldComps
    }
  }
  console.log(max)
  swaps.push(maxes[Math.floor(Math.random() * maxes.length)])
}

function doComputation(register: string): Boolean {
  const computation = computationMap.get(register)
  if (!computation) throw new Error("no computation found")
  const reg1 =
    registerMap.get(computation.reg1) ?? doComputation(computation.reg1)
  const reg2 =
    registerMap.get(computation.reg2) ?? doComputation(computation.reg2)

  switch (computation.op) {
    case "AND":
      registerMap.set(register, reg1 && reg2)
      return reg1 && reg2
    case "OR":
      registerMap.set(register, reg1 || reg2)
      return reg1 || reg2
    case "XOR":
      registerMap.set(register, reg1 !== reg2)
      return reg1 !== reg2
  }
  throw new Error("invalid operation")
}

// goal
// 53327832384706
// wrong
