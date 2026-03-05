const fs = require("fs");
const content = fs.readFileSync("src/data/chapter1.js", "utf-8");
const arrayStr = content.replace("export const chapter1Shlokas = ", "");
try {
  const shlokas = eval(arrayStr);
  console.log("Found shlokas: " + shlokas.length);
  fs.writeFileSync("test_eval.txt", "Success: " + shlokas.length);
} catch (e) {
  fs.writeFileSync("test_eval.txt", "Error: " + e.message);
}
