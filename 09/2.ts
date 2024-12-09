// TODO: recreate pt 1 from this
import * as _ from "../aoc-utils"

const a = _.input.split("").map(Number)
let memory = [] as (number | null)[]

const files = new Map<
  number, // file number
  { size: number; index: number }
>()
a.forEach((num, i) => {
  const toPush = i % 2 === 0 ? i / 2 : null
  if (toPush !== null) {
    files.set(toPush, { size: num, index: memory.length })
  }
  const amountToPush = num
  _.range(amountToPush).forEach(() => memory.push(toPush))
})

for (let i = files.size - 1; i >= 0; i--) {
  const file = files.get(i)!
  const num = i
  const { size, index } = file
  const firstIndexWithEnoughNulls = memory.findIndex(
    (_, i) =>
      i + size < memory.length &&
      memory.slice(i, i + size).every((a) => a === null),
  )

  if (firstIndexWithEnoughNulls !== -1 && firstIndexWithEnoughNulls < index) {
    memory.fill(
      num,
      firstIndexWithEnoughNulls,
      firstIndexWithEnoughNulls + size,
    )
    memory.fill(null, index, index + size)
  }
}

const b = memory.map((num, i) => (num === null ? 0 : num * i))
_.tap(_.sum(b))
