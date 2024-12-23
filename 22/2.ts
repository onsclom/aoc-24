import * as _ from "../aoc-utils"

const windowMap = new Map<string, number>()

const a = _.input
  // "123"
  .split("\n")
  .map(BigInt)
  .map((start) => {
    let curSecretNumber = start
    const nextRandNumsToCalc = 2000

    let lastOnesPlace = BigInt(String(curSecretNumber).slice(-1))
    let dxWindow = [] // grows up to 4
    const seenWindows = new Set<string>()
    for (let i = 0; i <= nextRandNumsToCalc - 1; i++) {
      // STEP 1
      const res = curSecretNumber * BigInt(64)
      // mixing
      curSecretNumber ^= res
      // prune
      curSecretNumber %= BigInt(16777216)

      //STEP 2
      /*Calculate the result of dividing the secret number by 32.
      Round the result down to the nearest integer.
      Then, mix this result into the secret number. Finally, prune the secret number. */
      const res2 = BigInt(curSecretNumber) / BigInt(32)
      // mixing
      curSecretNumber ^= res2
      // prune
      curSecretNumber %= BigInt(16777216)

      //STEP 3
      /*Calculate the result of multiplying the secret number by 2048. Then, mix this result into the secret number. Finally, prune the secret number. */
      const res3 = curSecretNumber * BigInt(2048)
      // mixing
      curSecretNumber ^= res3
      // prune
      curSecretNumber %= BigInt(16777216)

      const onesPlace = BigInt(String(curSecretNumber).slice(-1))
      const curDx = onesPlace - lastOnesPlace
      dxWindow.push(curDx)
      while (dxWindow.length > 4) dxWindow.shift()
      lastOnesPlace = onesPlace

      const windowString = dxWindow.join(",")
      if (dxWindow.length === 4 && !seenWindows.has(windowString)) {
        const curWindowCount =
          (windowMap.get(windowString) ?? 0) + Number(lastOnesPlace)
        windowMap.set(windowString, curWindowCount)
        if (windowString === "-2,1,-1,3") {
          console.log("found")
          console.log(onesPlace)
        }
      }
      seenWindows.add(windowString)
    }

    return curSecretNumber
  })

let max = 0
let maxKey = ""
for (const [key, value] of windowMap) {
  if (value > max) {
    max = value
    maxKey = key
  }
}

_.tap({
  max,
  maxKey,
})

// _.tap(windowMap)
// _.tap(a.reduce((a, b) => a + b))
