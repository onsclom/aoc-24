const inputFile = Bun.file("./input.txt");
const input = await inputFile.text();
const lines = input.split("\n").map((line) => line.split("   ").map(Number));

const leftColumn = lines.map((line) => line[0]).toSorted();
const rightColumn = lines.map((line) => line[1]).toSorted();

const absoulteDifference = leftColumn
  .map((left, index) => Math.abs(left - rightColumn[index]))
  .reduce((acc, diff) => acc + diff, 0);

console.log(absoulteDifference);
