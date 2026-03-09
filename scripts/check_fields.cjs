const fs = require("fs");

const extractData = (chapterContent) => {
  // Use a regex to easily find each verse's structure
  return chapterContent;
};

for (let ch = 1; ch <= 18; ch++) {
  const content = fs.readFileSync(`./src/data/chapter${ch}.js`, "utf8");

  // count occurrences of keys
  const numMatches = [...content.matchAll(/num\s*:/g)].length;
  const englishMatches = [...content.matchAll(/english\s*:/g)].length;
  const hindiMatches = [...content.matchAll(/hindi\s*:/g)].length;
  const meaningMatches = [...content.matchAll(/meaning\s*:/g)].length;
  const hindiMeaningMatches = [...content.matchAll(/hindi_meaning\s*:/g)]
    .length;
  const meaningExactMatches = [
    ...content.matchAll(/^\s*["']?meaning["']?\s*:/gm),
  ].length;
  const hindiMeaningExactMatches = [
    ...content.matchAll(/^\s*["']?hindi_meaning["']?\s*:/gm),
  ].length;

  console.log(`Chapter ${ch}:`);
  console.log(`  verses: ${numMatches}`);
  console.log(`  english: ${englishMatches}`);
  console.log(`  hindi: ${hindiMatches}`);
  console.log(
    `  meaning exact: ${meaningExactMatches} (total meaning substring: ${meaningMatches})`,
  );
  console.log(`  hindi_meaning exact: ${hindiMeaningExactMatches}`);

  if (numMatches !== meaningExactMatches) {
    console.log(`  ⚠️ MISMATCH in Chapter ${ch}`);
  }
}
