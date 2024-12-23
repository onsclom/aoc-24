import * as _ from "../aoc-utils"

const a = _.test

const dirKeypad = {
  up: { x: 1, y: 0 },
  A: { x: 2, y: 0 },
  left: { x: 0, y: 1 },
  down: { x: 1, y: 1 },
  right: { x: 2, y: 1 },
}

const numKeypad = {
  0: { x: 1, y: 3 },
  A: { x: 2, y: 3 },
  1: { x: 0, y: 2 },
  2: { x: 1, y: 2 },
  3: { x: 2, y: 2 },
  4: { x: 0, y: 1 },
  5: { x: 1, y: 1 },
  6: { x: 2, y: 1 },
  7: { x: 0, y: 0 },
  8: { x: 1, y: 0 },
  9: { x: 2, y: 0 },
}

/*
In summary, there are the following keypads:

One directional keypad that you are using.
Two directional keypads that robots are using.
One numeric keypad (on a door) that a robot is using.
*/

// When the robot arrives at the numeric keypad, its robotic arm is pointed at the A button in the bottom right corner
let dirRobot1 = { x: 2, y: 0 }
let dirRobot2 = { x: 2, y: 0 }
let numRobot = { x: 2, y: 3 }

a.split("\n").forEach((line) => {
  console.log(line)

  for (const char of line) {
    console.log(char)
  }
})
