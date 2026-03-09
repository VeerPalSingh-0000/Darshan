// Script to analyze all Gita chapter files for issues
const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "..", "src", "data");

// Expected verse counts per chapter (standard Bhagavad Gita)
const expectedVerseCounts = {
  1: 47,
  2: 72,
  3: 43,
  4: 42,
  5: 29,
  6: 47,
  7: 30,
  8: 28,
  9: 34,
  10: 42,
  11: 55,
  12: 20,
  13: 35,
  14: 27,
  15: 20,
  16: 24,
  17: 28,
  18: 78,
};

const allIssues = [];

for (let ch = 1; ch <= 18; ch++) {
  const filePath = path.join(dataDir, `chapter${ch}.js`);
  const content = fs.readFileSync(filePath, "utf8");

  const lines = content.split("\n");

  const verses = [];

  // Match both "num": 1 and num: 1 patterns
  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const line = lines[lineIdx];
    const lineNumMatch = line.match(/["']?num["']?\s*:\s*(\d+)/);
    if (lineNumMatch) {
      verses.push({
        num: parseInt(lineNumMatch[1]),
        lineNumber: lineIdx + 1,
        lineContent: line.trim(),
      });
    }
  }

  const chapterIssues = [];
  const expected = expectedVerseCounts[ch];

  // Check for duplicates
  const numCounts = {};
  verses.forEach((v) => {
    if (!numCounts[v.num]) numCounts[v.num] = [];
    numCounts[v.num].push(v.lineNumber);
  });

  for (const [num, lineNums] of Object.entries(numCounts)) {
    if (lineNums.length > 1) {
      chapterIssues.push({
        type: "DUPLICATE",
        message: `Verse ${num} appears ${lineNums.length} times at lines: ${lineNums.join(", ")}`,
      });
    }
  }

  // Check for missing verses
  const existingNums = new Set(verses.map((v) => v.num));
  const missingNums = [];
  for (let i = 1; i <= expected; i++) {
    if (!existingNums.has(i)) {
      missingNums.push(i);
    }
  }
  if (missingNums.length > 0) {
    chapterIssues.push({
      type: "MISSING",
      message: `Missing verses: ${missingNums.join(", ")}`,
    });
  }

  // Check for extra verses (beyond expected count)
  const extraNums = verses.filter((v) => v.num > expected || v.num < 1);
  if (extraNums.length > 0) {
    chapterIssues.push({
      type: "EXTRA",
      message: `Extra/invalid verse numbers: ${extraNums.map((v) => `${v.num} (line ${v.lineNumber})`).join(", ")}`,
    });
  }

  // Check ordering
  for (let i = 1; i < verses.length; i++) {
    if (verses[i].num < verses[i - 1].num) {
      chapterIssues.push({
        type: "ORDER",
        message: `Out of order: verse ${verses[i - 1].num} (line ${verses[i - 1].lineNumber}) followed by verse ${verses[i].num} (line ${verses[i].lineNumber})`,
      });
    }
  }

  // Check for non-sequential jumps (skipped verses in sequence)
  for (let i = 1; i < verses.length; i++) {
    const diff = verses[i].num - verses[i - 1].num;
    if (diff > 1 && verses[i - 1].num !== verses[i].num) {
      const skipped = [];
      for (let j = verses[i - 1].num + 1; j < verses[i].num; j++) {
        skipped.push(j);
      }
      chapterIssues.push({
        type: "GAP",
        message: `Gap between verse ${verses[i - 1].num} (line ${verses[i - 1].lineNumber}) and verse ${verses[i].num} (line ${verses[i].lineNumber}) - skipped: ${skipped.join(", ")}`,
      });
    }
  }

  // Check for same num appearing consecutively (overlap/wrong numbering)
  for (let i = 1; i < verses.length; i++) {
    if (verses[i].num === verses[i - 1].num) {
      chapterIssues.push({
        type: "CONSECUTIVE_DUP",
        message: `Verse ${verses[i].num} appears consecutively at lines ${verses[i - 1].lineNumber} and ${verses[i].lineNumber}`,
      });
    }
  }

  // Summary
  console.log(`\n=== Chapter ${ch} ===`);
  console.log(`Expected verses: ${expected}`);
  console.log(`Found verses: ${verses.length}`);
  console.log(`Unique verse numbers: ${existingNums.size}`);
  if (verses.length > 0) {
    console.log(
      `Verse range: ${Math.min(...verses.map((v) => v.num))} - ${Math.max(...verses.map((v) => v.num))}`,
    );
  }

  if (chapterIssues.length === 0) {
    console.log(`✅ No issues found`);
  } else {
    console.log(`❌ ${chapterIssues.length} issue(s) found:`);
    chapterIssues.forEach((issue) => {
      console.log(`  [${issue.type}] ${issue.message}`);
    });
  }

  allIssues.push({
    chapter: ch,
    issues: chapterIssues,
    verseCount: verses.length,
    expected,
  });
}

// Final summary
console.log("\n\n========== SUMMARY ==========");
const chaptersWithIssues = allIssues.filter((c) => c.issues.length > 0);
if (chaptersWithIssues.length === 0) {
  console.log("✅ All chapters look correct!");
} else {
  console.log(`❌ ${chaptersWithIssues.length} chapter(s) have issues:`);
  chaptersWithIssues.forEach((c) => {
    console.log(
      `  Chapter ${c.chapter}: ${c.issues.length} issue(s) (found ${c.verseCount}/${c.expected} verses)`,
    );
  });
}
