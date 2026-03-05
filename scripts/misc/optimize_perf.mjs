import fs from "fs";
import path from "path";

const dir = "src/Pages/Gita/Chapters";
const files = fs
  .readdirSync(dir)
  .filter((f) => f.startsWith("Adhyay") && f.endsWith(".jsx"));

files.forEach((f) => {
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, "utf-8");

  // Fix the key that forces unmounting/remounting on every language change
  content = content.replace(
    /key=\{`translation-\$\{selectedLanguage\}-\$\{shloka\.num\}`\}/g,
    "key={`translation-${shloka.num}`}",
  );
  content = content.replace(
    /key=\{`meaning-\$\{selectedLanguage\}-\$\{shloka\.num\}`\}/g,
    "key={`meaning-${shloka.num}`}",
  );

  // Also optimize motion.div variants to not aggressively recalculate DOM sizes on text swap
  content = content.replace(
    /viewport=\{\{ once: true \}\}/g,
    'viewport={{ once: true, margin: "100px" }}',
  );

  fs.writeFileSync(filePath, content, "utf-8");
});

console.log("Optimization complete.");
