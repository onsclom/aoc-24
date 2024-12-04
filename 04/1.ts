const inputFile = Bun.file("./input.txt");
const input = await inputFile.text();
const grid = input.split("\n").map((line) => line.split(""));

const wordSearchDirs = [
  [0, 1],
  [1, 0],
  [1, 1],
  [-1, 0],
  [0, -1],
  [-1, -1],
  [1, -1],
  [-1, 1],
];

let timesAppearing = 0;
const searchingFor = "XMAS";

for (const y of Array.from({ length: grid.length }, (_, i) => i)) {
  for (const x of Array.from({ length: grid[0].length }, (_, i) => i)) {
    for (const [dx, dy] of wordSearchDirs) {
      let word = "";
      let cx = x;
      let cy = y;
      while (cx >= 0 && cy >= 0 && cx < grid[0].length && cy < grid.length) {
        word += grid[cy][cx];
        if (word === searchingFor) {
          timesAppearing++;
        }
        cx += dx;
        cy += dy;
      }
    }
  }
}

console.log(timesAppearing);
