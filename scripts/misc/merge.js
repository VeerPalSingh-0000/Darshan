const fs = require("fs");
const path = require("path");

let contentAll = "export const chapter1Shlokas = [\n";
const parts = ["chapter1_part1.js", "chapter1_part2.js", "chapter1_part3.js"];

for (const part of parts) {
  const p = path.join("src", "data", part);
  const content = fs.readFileSync(p, "utf-8");
  const start = content.indexOf("[");
  const end = content.lastIndexOf("]");

  if (start !== -1 && end !== -1) {
    let arrayContent = content.substring(start + 1, end).trim();
    if (arrayContent) {
      if (arrayContent.endsWith("}")) {
        contentAll += arrayContent + ",\n";
      } else if (arrayContent.endsWith(",")) {
        contentAll += arrayContent + "\n";
      }
    }
  }
}

// remove trailing comma if needed
contentAll = contentAll.replace(/,\s*$/, "\n");
contentAll += "];\n";

fs.writeFileSync(path.join("src", "data", "chapter1.js"), contentAll, "utf-8");
console.log("Merged successfully!");
