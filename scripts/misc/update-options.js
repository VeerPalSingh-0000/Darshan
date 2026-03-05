const fs = require("fs");
const path = require("path");
const dir = path.join(process.cwd(), "src", "Pages", "Gita", "Chapters");
console.log("Target directory:", dir);
try {
  fs.readdirSync(dir).forEach((file) => {
    if (file.endsWith(".jsx")) {
      let code = fs.readFileSync(path.join(dir, file), "utf8");

      const before = code.length;

      code = code.replace(
        /<option value="([a-z]+)">([^<]+)<\/option>/g,
        '<option value="$1" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">$2</option>',
      );

      // Also fix the div container that has the select for dark visibility
      code = code.replace(
        /bg-white\/80 dark:bg-slate-900\/80 backdrop-blur-sm border border-amber-200\/50 dark:border-slate-800 rounded-full shadow-sm hover:border-amber-300 dark:hover:border-amber-700 transition-colors/g,
        "bg-white/90 dark:bg-slate-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-slate-700 rounded-full shadow-sm hover:bg-amber-50 dark:hover:bg-slate-700/80 transition-all duration-300",
      );

      code = code.replace(
        /text-slate-800 dark:text-slate-200 font-bold focus:outline-none/g,
        "text-slate-800 dark:text-slate-100 font-bold focus:outline-none",
      );

      if (before !== code.length) {
        console.log(`Updated ${file}`);
      }
      fs.writeFileSync(path.join(dir, file), code);
    }
  });
  console.log("All files updated successfully.");
} catch (err) {
  console.error("Error updating files:", err);
}
