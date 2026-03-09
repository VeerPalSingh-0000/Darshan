// Script to find verses where Sanskrit text contains lines from the next verse
// Pattern: Sanskrit text of verse N contains lines with ॥N॥ marker AND extra lines
// that should belong to verse N+1
const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "..", "src", "data");

for (let ch = 1; ch <= 18; ch++) {
  const filePath = path.join(dataDir, `chapter${ch}.js`);
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");

  // Parse all verse entries
  const verses = [];
  let currentVerse = null;
  let inSanskrit = false;
  let sanskritLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect num field
    const numMatch = line.match(/["']?num["']?\s*:\s*(\d+)/);
    if (numMatch) {
      if (currentVerse) {
        verses.push(currentVerse);
      }
      currentVerse = {
        num: parseInt(numMatch[1]),
        lineIdx: i,
        sanskrit: "",
        sanskritLineIdx: -1,
      };
    }

    // Detect sanskrit field
    if (currentVerse) {
      const sanskritMatch = line.match(/["']?sanskrit["']?\s*[:=]\s*["'`]/);
      if (sanskritMatch) {
        // Extract the sanskrit text - it could be on single or multiple lines
        // Find the full sanskrit value
        let sanskritText = "";
        let j = i;
        let fullLine = lines[j];

        // Handle multi-line strings (template literals or string concatenation)
        while (j < lines.length) {
          fullLine = lines[j];
          sanskritText += fullLine + "\n";

          // Check if this line ends the sanskrit field
          // Look for closing quote followed by comma or end of value
          if (
            j > i &&
            (fullLine.includes('",') ||
              fullLine.includes("',") ||
              fullLine.match(/["`'],?\s*$/))
          ) {
            break;
          }
          if (
            j === i &&
            fullLine.match(/sanskrit["']?\s*[:=]\s*["'`].*["'`],?\s*$/)
          ) {
            break;
          }
          j++;
        }

        currentVerse.sanskrit = sanskritText;
        currentVerse.sanskritLineIdx = i;
      }
    }
  }
  if (currentVerse) verses.push(currentVerse);

  // Now check each verse's Sanskrit for misaligned content
  let hasIssues = false;
  for (let i = 0; i < verses.length; i++) {
    const v = verses[i];
    const sanskrit = v.sanskrit;

    // Find all verse markers ॥N॥ in the Sanskrit text
    const markers = [];
    const markerRegex = /॥\s*(\d+)\s*॥/g;
    let match;
    while ((match = markerRegex.exec(sanskrit)) !== null) {
      markers.push(parseInt(match[1]));
    }

    if (markers.length === 0) continue;

    // Check if there are verse markers that don't match this verse's num
    // AND there's extra text AFTER the verse's own marker
    const ownMarkerIdx = sanskrit.indexOf(`॥${v.num}॥`);
    if (ownMarkerIdx === -1) continue;

    // Check for text after the verse's own marker (excluding whitespace and closing quotes)
    const afterOwnMarker = sanskrit.substring(
      ownMarkerIdx + `॥${v.num}॥`.length,
    );
    const meaningfulTextAfter =
      afterOwnMarker.replace(/[\\n\s"',`]/g, "").length > 0;

    // Check for verse markers of other verses
    const otherMarkers = markers.filter((m) => m !== v.num);

    if (meaningfulTextAfter && otherMarkers.length === 0) {
      // Text after marker but no other verse marker - likely a partial line from next verse
      if (!hasIssues) {
        console.log(`\n=== Chapter ${ch} ===`);
        hasIssues = true;
      }
      console.log(
        `  [PARTIAL] Verse ${v.num} (line ~${v.sanskritLineIdx + 1}): Has extra text after ॥${v.num}॥ marker (possible misaligned line)`,
      );
      // Show the extra text
      const extraText = afterOwnMarker.replace(/[\\n"',`\s]+$/, "").trim();
      if (extraText.length > 0 && extraText.length < 200) {
        console.log(`    Extra text: "${extraText}"`);
      }
    }

    if (otherMarkers.length > 0) {
      if (!hasIssues) {
        console.log(`\n=== Chapter ${ch} ===`);
        hasIssues = true;
      }
      console.log(
        `  [MERGED] Verse ${v.num} (line ~${v.sanskritLineIdx + 1}): Contains markers for verses: ${markers.join(", ")}`,
      );
    }
  }

  if (!hasIssues) {
    // Silent for clean chapters
  }
}

console.log("\n\nDone scanning all chapters.");
