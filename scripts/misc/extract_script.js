const fs = require("fs");

const content = fs.readFileSync("src/Pages/Gita/Chapters/Adhyay1.jsx", "utf-8");
const start = content.indexOf("const chapter1Shlokas = [");
const end = content.indexOf("];", start) + 2;

const arrayStr = content
  .substring(start, end)
  .replace("const chapter1Shlokas = ", "module.exports = ");
fs.writeFileSync("chapter1_temp.js", arrayStr, "utf-8");
console.log("done extraction");
