const inputFile = Bun.file("./input.txt");
const input = await inputFile.text();
const lines = input.split("\n").map((line) => line.split(" ").map(Number));
const safe = lines.filter((line) => {
  const linePermutations = [
    ...Array.from({ length: line.length }, (_, i) => i).map((i) => [
      ...line.slice(0, i),
      ...line.slice(i + 1),
    ]),
  ];

  function checkLine(line: number[]) {
    // check if all ascending or descending
    const dir = Math.sign(line[1] - line[0]);

    for (let i = 1; i < line.length; i++) {
      if (Math.sign(line[i] - line[i - 1]) !== dir || dir === 0) {
        return false;
      }
      if (Math.abs(line[i] - line[i - 1]) > 3) {
        return false;
      }
    }
    return true;
  }

  return linePermutations.some(checkLine);
});

console.log(safe.length);
