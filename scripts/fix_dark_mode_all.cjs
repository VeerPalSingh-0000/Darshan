const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", "src", "Pages", "Gita", "Chapters");

let filesToUpdate = [];

for (let i = 1; i <= 18; i++) {
  const filePath = path.join(dir, `Adhyay${i}.jsx`);
  if (!fs.existsSync(filePath)) continue;

  const content = fs.readFileSync(filePath, "utf8");

  // We want to check for <p className="text-slate-700... italic" missing dark:text-slate-200
  const matches = content.match(
    /<p className="[^"]*text-slate-700[^"]*italic"[^>]*>/g,
  );

  if (matches) {
    let needsUpdate = false;
    let newContent = content;

    matches.forEach((match) => {
      if (!match.includes("dark:text-slate-200")) {
        needsUpdate = true;

        let newMatch = match.replace(
          "text-slate-700",
          "text-slate-700 dark:text-slate-200",
        );
        newContent = newContent.replace(match, newMatch);
      }
    });

    // Also check for the gradient backgrounds missing dark classes
    const bgMatches = newContent.match(
      /<div className="bg-gradient-to-r from-emerald-[^"]*"/g,
    );
    if (bgMatches) {
      bgMatches.forEach((bgMatch) => {
        if (!bgMatch.includes("dark:from-emerald-900")) {
          needsUpdate = true;
          let newBgMatch = bgMatch.replace(
            '"',
            ' dark:from-emerald-900/10 dark:to-green-900/10 dark:border-slate-800"',
          );
          // Actually, replacing just the end quotes is enough and then adding the extra classes
          newContent = newContent.replace(
            bgMatch,
            bgMatch +
              " dark:from-emerald-900/10 dark:to-green-900/10 dark:border-slate-800",
          );
        }
      });
    }

    // Check missing dark mode on the heading <h3 className="font-bold text-slate-800 text-lg">
    const h3Matches = newContent.match(
      /<h3 className="[^"]*text-slate-800[^"]*"/g,
    );
    if (h3Matches) {
      h3Matches.forEach((h3Match) => {
        if (!h3Match.includes("dark:text-slate-100")) {
          needsUpdate = true;
          let newH3Match = h3Match.replace(
            "text-slate-800",
            "text-slate-800 dark:text-slate-100",
          );
          newContent = newContent.replace(h3Match, newH3Match);
        }
      });
    }

    if (needsUpdate) {
      filesToUpdate.push(`Adhyay${i}.jsx`);
      fs.writeFileSync(filePath, newContent, "utf8");
    }
  }
}

console.log("Fixed files II:", filesToUpdate.join(", "));
