const fs = require("fs");

const ch2 = fs.readFileSync("src/data/chapter2.js", "utf8");

const matches = [...ch2.matchAll(/meaning\s*:\s*["']([^"']*)["']/g)];
for (let i = 0; i < 5; i++) {
  console.log(`Verse ${i + 1}: ${matches[i] ? matches[i][1] : "missing"}`);
}
