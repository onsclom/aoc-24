const inputFile = Bun.file("./input.txt");
const input = await inputFile.text();

const lines = input.split("\n").map((line) => line.split(" ").map(Number));

const safe = lines.filter((line) => {
  let problems = 0;

  const dir = Math.sign(line[1] - line[0]);

  for (let i = 1; i < line.length; i++) {
    if (Math.sign(line[i] - line[i - 1]) !== dir) {
      problems++;
    }
    if (Math.abs(line[i] - line[i - 1]) > 3) {
      problems++;
    }
  }

  return problems <= 1;
});

console.log(safe.length);
