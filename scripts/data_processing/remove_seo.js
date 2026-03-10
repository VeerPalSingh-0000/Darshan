import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, "../../src/Pages/Gita/Chapters");
const files = fs
  .readdirSync(dir)
  .filter((f) => f.startsWith("Adhyay") && f.endsWith(".jsx"));

files.forEach((file) => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, "utf8");

  // Replace all <SEO ... /> tags
  while (content.includes("<SEO")) {
    const startIndex = content.indexOf("<SEO");
    const endIndex = content.indexOf("/>", startIndex) + 2;
    content = content.substring(0, startIndex) + content.substring(endIndex);
  }

  // Remove existing imports
  content = content.replace(/import SEO from .*?;\r?\n/g, "");

  fs.writeFileSync(filePath, content, "utf8");
});

console.log("Completely wiped SEO from all chapters using index replacement.");
