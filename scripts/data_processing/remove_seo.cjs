const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "../../src/Pages/Gita/Chapters");
const files = fs
  .readdirSync(dir)
  .filter((f) => f.startsWith("Adhyay") && f.endsWith(".jsx"));

files.forEach((file) => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, "utf8");
  let originalContent = content;

  // Keep looping and removing '<SEO ' until '/>'
  while (content.includes("<SEO ")) {
    let startIdx = content.indexOf("<SEO ");
    if (startIdx !== -1) {
      let endIdx = content.indexOf("/>", startIdx);
      if (endIdx !== -1) {
        // remove the tag
        content =
          content.substring(0, startIdx) + content.substring(endIdx + 2);
      } else {
        break; // malformed tag, bail out
      }
    }
  }

  // Also remove imports
  content = content.replace(
    /import {?.*?SEO.*?}? from [\'\"].*?SEO.*?[\'\"];?\n?/g,
    "",
  );
  content = content.replace(
    /import SEO from "\.\.\/\.\.\/\.\.\/components\/SEO";\n?/g,
    "",
  );

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`Cleaned SEO from ${file}`);
  }
});
