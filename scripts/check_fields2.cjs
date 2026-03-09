const fs = require("fs");

for (let ch = 1; ch <= 18; ch++) {
  const content = fs.readFileSync(`./src/data/chapter${ch}.js`, "utf8");

  // count occurrences of keys (both with and without quotes)
  const numMatches = [...content.matchAll(/["']?num["']?\s*:/g)].length;
  const englishMatches = [...content.matchAll(/["']?english["']?\s*:/g)].length;
  const hindiMatches = [...content.matchAll(/["']?hindi["']?\s*:/g)].length;
  const meaningExactMatches = [
    ...content.matchAll(/^\s*["']?meaning["']?\s*:/gm),
  ].length;
  const hindiMeaningExactMatches = [
    ...content.matchAll(/^\s*["']?hindi_meaning["']?\s*:/gm),
  ].length;

  console.log(`Chapter ${ch}:`);
  console.log(`  verses(num):    ${numMatches}`);
  console.log(`  english:        ${englishMatches}`);
  console.log(`  hindi:          ${hindiMatches}`);
  console.log(`  meaning:        ${meaningExactMatches}`);
  console.log(`  hindi_meaning:  ${hindiMeaningExactMatches}`);

  const expected = numMatches;
  if (
    englishMatches !== expected ||
    hindiMatches !== expected ||
    meaningExactMatches !== expected ||
    hindiMeaningExactMatches !== expected
  ) {
    console.log(`  ⚠️ MISMATCH in Chapter ${ch}`);
  }
}
