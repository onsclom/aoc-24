import * as _ from "../aoc-utils"

// const connections = new Map<string, string>()
const connections = new Map<string, string[]>()
const computers = new Set<string>()

const a = _.input
  .split("\n")
  .map((line) => line.split("-"))
  .forEach(([a, b]) => {
    const aConnections = connections.get(a) || []
    aConnections.push(b)
    connections.set(a, aConnections)

    const bConnections = connections.get(b) || []
    bConnections.push(a)
    connections.set(b, bConnections)

    computers.add(a)
    computers.add(b)
  })

for (let groupSize = 3; ; groupSize++) {
  const lanParties = new Set<string>()
  computers.forEach((c) => {
    // find amount of connections
    const cConnections = connections.get(c) || []

    // get every combination of size groupSize-1
    const combinations = _.combinations(cConnections, groupSize - 1)
    combinations.forEach((combo) => {
      const realCombo = [c, ...combo]
      // make sure every item is connected to every other item
      const connected = realCombo.every((item) => {
        const itemConnections = connections.get(item) || []
        return realCombo.every(
          (otherItem) =>
            itemConnections.includes(otherItem) || item === otherItem,
        )
      })

      if (connected) {
        lanParties.add(realCombo.sort().join(","))
      }
    })
  })

  _.tap(lanParties)
  if (lanParties.size === 0) {
    break
  }
}

console.log("done")

// .split("\n")
// [...lanParties]
