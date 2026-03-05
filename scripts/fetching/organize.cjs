const fs = require("fs");
const path = require("path");

const dirs = [
  "scripts",
  "scripts/translation",
  "scripts/fetching",
  "scripts/generators",
  "scripts/misc",
];

dirs.forEach((d) => {
  if (!fs.existsSync(d)) fs.mkdirSync(d);
});

const files = fs.readdirSync(".");

files.forEach((f) => {
  if (!fs.statSync(f).isFile()) return;
  if (f === "organize.js") return;

  let dest = null;
  if (f.startsWith("translate") || f.startsWith("final_translation"))
    dest = "scripts/translation";
  else if (
    ((f.startsWith("fetch") ||
      f.startsWith("download") ||
      f.startsWith("populate") ||
      f.startsWith("gita_fetch")) &&
      f.endsWith(".js")) ||
    f.endsWith(".py") ||
    f.endsWith(".cjs")
  )
    dest = "scripts/fetching";
  else if (f.startsWith("gen_") || f.startsWith("generate"))
    dest = "scripts/generators";
  else if (
    f.startsWith("check") ||
    f.startsWith("extract") ||
    f.includes("log.txt") ||
    f === "gita_dump.txt" ||
    f === "merge.js" ||
    f === "script2.js" ||
    f.startsWith("test_") ||
    f.startsWith("update_") ||
    f.startsWith("update-") ||
    f.startsWith("fix-") ||
    f === "detailed_c1.json" ||
    f === "run.bat" ||
    f === "run.mjs" ||
    f === "translate_all_chapters.log"
  )
    dest = "scripts/misc";

  if (dest) {
    fs.renameSync(f, path.join(dest, f));
    console.log(`Moved ${f} to ${dest}`);
  }
});
