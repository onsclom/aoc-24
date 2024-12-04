const inputFile = Bun.file("./input.txt");
const input = await inputFile.text();
const lines = input.split("\n").map((line) => line.split(" ").map(Number));
const safe = lines.filter((line) => {
  // check if all ascending or descending
  const dir = Math.sign(line[1] - line[0]);
  for (let i = 1; i < line.length; i++) {
    if (Math.sign(line[i] - line[i - 1]) !== dir) {
      return false;
    }
    if (Math.abs(line[i] - line[i - 1]) > 3) {
      return false;
    }
  }
  return true;
});
const count = safe.length;
console.log(count);
