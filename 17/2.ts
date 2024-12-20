import * as _ from "../aoc-utils"

const [p1, p2] = _.input.split("\n\n")

let a = 10000000000000
while (true) {
  console.log(`testing with a: ${a}`)

  const r = p1.split("\n").map((line) => line.split(": "))
  const registers = new Map<string, number>()
  r.forEach(([name, value]) => {
    const rName = name[name.length - 1]
    registers.set(rName, 0)
  })
  registers.set("A", a)

  const instructions = p2.split(": ")[1].split(",").map(Number)

  let ip = 0
  let output = []

  while (ip < instructions.length) {
    const opcode = instructions[ip]
    const operandNum = instructions[ip + 1]
    let operand = 0
    switch (operandNum) {
      case 0:
      case 1:
      case 2:
      case 3:
        operand = operandNum
        break
      case 4:
        operand = registers.get("A")!
        break
      case 5:
        operand = registers.get("B")!
        break
      case 6:
        operand = registers.get("C")!
        break
      case 7:
        throw new Error("invalid operand")
    }

    ip += 2
    switch (opcode) {
      case 0:
        registers.set("A", Math.floor(registers.get("A")! / 2 ** operand))
        break
      case 1:
        registers.set("B", registers.get("B")! ^ operandNum)
        break
      case 2:
        registers.set("B", operand ^ 3)
        break
      case 3:
        if (registers.get("A") !== 0) {
          ip = operand
        }
        break
      case 4:
        registers.set("B", registers.get("B")! ^ registers.get("C")!)
        break
      case 5:
        output.push(operand % 8)
        break
      case 6:
        registers.set("B", Math.floor(registers.get("A")! / 2 ** operand))
        break
      case 7:
        registers.set("C", Math.floor(registers.get("A")! / 2 ** operand))
        break
    }
  }

  console.log(output.join(","))
  a++
}
// wrong 4,6,3,5,6,3,5,2,1,0
