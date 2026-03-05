const fs = require("fs");
const path = require("path");
const dir = path.join(__dirname, "src", "Pages", "Gita", "Chapters");
fs.readdirSync(dir).forEach((file) => {
  if (file.endsWith(".jsx")) {
    let code = fs.readFileSync(path.join(dir, file), "utf8");
    code = code.replace(
      /<option value="hindi">Hindi<\/option>/g,
      '<option value="hindi" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">Hindi</option>',
    );
    code = code.replace(
      /<option value="english">English<\/option>/g,
      '<option value="english" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">English</option>',
    );
    code = code.replace(
      /<option value="tamil">Tamil<\/option>/g,
      '<option value="tamil" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">Tamil</option>',
    );
    code = code.replace(
      /<option value="bengali">Bengali<\/option>/g,
      '<option value="bengali" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">Bengali</option>',
    );
    code = code.replace(
      /<option value="spanish">Spanish<\/option>/g,
      '<option value="spanish" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">Spanish</option>',
    );

    // Also fix the div container that has the select for dark visibility
    code = code.replace(
      /bg-white\/80 dark:bg-slate-900\/80 backdrop-blur-sm border border-amber-200\/50 dark:border-slate-800 rounded-full shadow-sm hover:border-amber-300 dark:hover:border-amber-700 transition-colors/g,
      "bg-white/90 dark:bg-slate-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-slate-700 rounded-full shadow-sm hover:bg-amber-50 dark:hover:bg-slate-700/80 transition-all duration-300",
    );
    fs.writeFileSync(path.join(dir, file), code);
  }
});
console.log("updated files");
