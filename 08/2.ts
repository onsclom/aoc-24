import * as _ from "../aoc-utils"

const answer = _.input.split("\n").map((line) => line.split(""))

const charToLocations = new Map<string, { x: number; y: number }[]>()
const width = answer[0].length
const height = answer.length

answer.forEach((line, y) => {
  line.forEach((char, x) => {
    if (char !== ".") {
      const locations = charToLocations.get(char) || []
      charToLocations.set(char, [...locations, { x, y }])
    }
  })
})

const antiNodes = new Set<string>()

charToLocations.forEach((locations) => {
  for (let i = 0; i < locations.length; i++) {
    for (let j = i + 1; j < locations.length; j++) {
      {
        const dx = locations[i].x - locations[j].x
        const dy = locations[i].y - locations[j].y
        let antinodex = locations[i].x
        let antinodey = locations[i].y
        while (
          antinodex >= 0 &&
          antinodex < width &&
          antinodey >= 0 &&
          antinodey < height
        ) {
          antiNodes.add(`${antinodex},${antinodey}`)
          antinodex += dx
          antinodey += dy
        }
      }
      {
        const dx = locations[j].x - locations[i].x
        const dy = locations[j].y - locations[i].y
        let antinodex = locations[j].x
        let antinodey = locations[j].y
        while (
          antinodex >= 0 &&
          antinodex < width &&
          antinodey >= 0 &&
          antinodey < height
        ) {
          antiNodes.add(`${antinodex},${antinodey}`)
          antinodex += dx
          antinodey += dy
        }
      }
    }
  }
})

_.tap(antiNodes.size)
