const inputFile = Bun.file("./input.txt");
const input = await inputFile.text();
const lines = input.split("\n").map((line) => line.split("   ").map(Number));

const leftColumn = lines.map((line) => line[0]);
const rightColumn = lines.map((line) => line[1]);

// number -> count
const rightColumnCounts = new Map<number, number>();
rightColumn.forEach((right) => {
  const count = rightColumnCounts.get(right) || 0;
  rightColumnCounts.set(right, count + 1);
});

let similarityScore = 0;
leftColumn.forEach((left) => {
  const count = rightColumnCounts.get(left) || 0;
  const score = count * left;
  similarityScore += score;
});

console.log(similarityScore);
