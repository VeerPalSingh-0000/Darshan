const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "src", "Pages", "Gita", "Chapters");
const files = fs
  .readdirSync(dir)
  .filter((f) => f.startsWith("Adhyay") && f.endsWith(".jsx"));

files.forEach((file) => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, "utf-8");

  // Fix the container bg for dark mode
  content = content.replace(
    /bg-white\/80 dark:bg-slate-900\/80 backdrop-blur-sm border border-amber-200\/50 dark:border-slate-800/g,
    "bg-white/90 dark:bg-slate-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-slate-700",
  );

  content = content.replace(
    /hover:border-amber-300 dark:hover:border-amber-700 transition-colors/g,
    "hover:bg-amber-50 dark:hover:bg-slate-700/80 transition-all duration-300",
  );

  // Fix the select text color
  content = content.replace(
    /className="bg-transparent text-slate-800 dark:text-slate-200 font-bold focus:outline-none cursor-pointer"/g,
    'className="bg-transparent text-slate-800 dark:text-slate-100 font-bold focus:outline-none cursor-pointer"',
  );

  // Fix the options
  const optionRegex = /<option value="([^"]+)">([^<]+)<\/option>/g;
  content = content.replace(
    optionRegex,
    '<option value="$1" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">$2</option>',
  );

  fs.writeFileSync(filePath, content);
});
console.log("Done");
