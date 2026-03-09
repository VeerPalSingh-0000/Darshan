const fs = require("fs");
const path = require("path");

const chaptersDir = path.join(
  __dirname,
  "..",
  "src",
  "Pages",
  "Gita",
  "Chapters",
);

let filesToUpdate = [];

for (let i = 1; i <= 18; i++) {
  const filePath = path.join(chaptersDir, `Adhyay${i}.jsx`);
  if (!fs.existsSync(filePath)) continue;

  const content = fs.readFileSync(filePath, "utf8");

  // Look for the missing dark classes pattern
  // Specifically: <div className="bg-gradient-to-r from-emerald-50/20 to-green-50/20 p-6 rounded-xl border border-slate-100">
  // followed by: <p className="text-slate-700 leading-relaxed

  const faultyPattern1 =
    'className="bg-gradient-to-r from-emerald-50/20 to-green-50/20 p-6 rounded-xl border border-slate-100"';
  const faultyPattern2 =
    'className="text-slate-700 leading-relaxed text-lg font-medium italic"';

  if (content.includes(faultyPattern1) || content.includes(faultyPattern2)) {
    filesToUpdate.push(`Adhyay${i}.jsx`);

    // Fix it
    let newContent = content.replace(
      'className="bg-gradient-to-r from-emerald-50/20 to-green-50/20 p-6 rounded-xl border border-slate-100"',
      'className="bg-gradient-to-r from-emerald-50/20 to-green-50/20 dark:from-emerald-900/10 dark:to-green-900/10 p-6 rounded-xl border border-slate-100 dark:border-slate-800"',
    );

    newContent = newContent.replace(
      'className="text-slate-700 leading-relaxed text-lg font-medium italic"',
      'className="text-slate-700 dark:text-slate-200 leading-relaxed text-lg font-medium italic"',
    );

    // But wait, what if it's the heading as well?
    // <h3 className="font-bold text-slate-800 text-lg"> instead of <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg">
    newContent = newContent.replace(
      'className="font-bold text-slate-800 text-lg"',
      'className="font-bold text-slate-800 dark:text-slate-100 text-lg"',
    );

    fs.writeFileSync(filePath, newContent, "utf8");
  }
}

console.log("Fixed files:", filesToUpdate.join(", "));
