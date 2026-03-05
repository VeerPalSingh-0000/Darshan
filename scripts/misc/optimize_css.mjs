import fs from "fs";
import path from "path";

const dir = "src/Pages/Gita/Chapters";
const files = fs
  .readdirSync(dir)
  .filter((f) => f.startsWith("Adhyay") && f.endsWith(".jsx"));

files.forEach((f) => {
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, "utf-8");

  // Strip transition-all and transition-colors from the heavy cards
  // Only keep translate/shadow transitions for hover, which are cheap
  content = content.replace(
    /transition-all duration-500/g,
    "transition-transform transition-shadow duration-300",
  );
  content = content.replace(/transition-colors duration-300/g, "duration-150");

  // Make the top-level body background switch instantaneous to eliminate full-page paint lags
  content = content.replace(/transition-colors duration-300">/g, '">');

  fs.writeFileSync(filePath, content, "utf-8");
});

console.log("CSS Transition Optimization complete.");
