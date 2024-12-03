const inputFile = Bun.file("./input.txt");
const input = await inputFile.text();

let index = 0;
let sum = 0;
let enabled = true;
while (index < input.length) {
  const remaining = input.slice(index);

  if (remaining.startsWith("mul")) {
    const regexParsed = remaining.match(/^mul\((\d+),(\d+)\)/);
    if (!regexParsed) {
      index++;
      continue;
    }

    const [_, a, b] = regexParsed;
    if (enabled) {
      sum += Number(a) * Number(b);
    }
  }

  index++;
}

console.log(sum);
