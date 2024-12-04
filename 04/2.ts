const inputFile = Bun.file("./input.txt");
const input = await inputFile.text();
const grid = input.split("\n").map((line) => line.split(""));

const diagonalAnswers = ["SAM", "MAS"];
const topLeftDiag = [
  [-1, -1],
  [0, 0],
  [1, 1],
];
const topRightDiag = [
  [1, -1],
  [0, 0],
  [-1, 1],
];

let timesAppearing = 0;
for (const y of Array.from({ length: grid.length }, (_, i) => i)) {
  for (const x of Array.from({ length: grid[0].length }, (_, i) => i)) {
    if (grid[y][x] === "A") {
      const topLeftDiagWord = topLeftDiag
        .map(([dy, dx]) => {
          const cx = x + dx;
          const cy = y + dy;
          return cx >= 0 && cy >= 0 && cx < grid[0].length && cy < grid.length
            ? grid[cy][cx]
            : "";
        })
        .join("");
      const topRightDiagWord = topRightDiag
        .map(([dy, dx]) => {
          const cx = x + dx;
          const cy = y + dy;
          return cx >= 0 && cy >= 0 && cx < grid[0].length && cy < grid.length
            ? grid[cy][cx]
            : "";
        })
        .join("");
      if (
        diagonalAnswers.includes(topLeftDiagWord) &&
        diagonalAnswers.includes(topRightDiagWord)
      ) {
        timesAppearing++;
      }
    }
  }
}

console.log(timesAppearing);
