const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "../../src/Pages/Gita/Chapters");
const files = fs
  .readdirSync(dir)
  .filter((f) => f.startsWith("Adhyay") && f.endsWith(".jsx"));

files.forEach((file) => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, "utf8");

  // SAFE Cleanup: Exactly match the generated SEO blocks
  // Remove exactly this format:
  // <SEO
  //   title={`...`}
  //   description={`...`}
  // />
  const safeSeoRegex =
    /<SEO[\s\n]*title=\{`[^`]*`\}[\s\n]*description=\{`[^`]*`\}[\s\n]*\/>/g;
  content = content.replace(safeSeoRegex, "");

  content = content.replace(
    /import SEO from "\.\.\/\.\.\/\.\.\/components\/SEO";\n/g,
    "",
  );

  // Re-inject pristine SEO
  content = content.replace(
    /(import React.*?;\n)/,
    `$1import SEO from "../../../components/SEO";\n`,
  );

  const match = file.match(/Adhyay(\d+)/);
  const chapterNum = match ? match[1] : "";

  const titleMatch = content.match(
    /<motion\.h1[^>]*>\s*([^<]+)\s*<\/motion\.h1>/,
  );
  const hindiTitle = titleMatch
    ? titleMatch[1].trim()
    : `Chapter ${chapterNum}`;

  const subtitleMatch = content.match(
    /<motion\.h2[^>]*>\s*([^<]+)\s*<\/motion\.h2>/,
  );
  const engSubtitle = subtitleMatch ? subtitleMatch[1].trim() : `Translation`;

  const seoComponent = `      <SEO 
        title={\`Bhagavad Gītā Chapter ${chapterNum}: ${hindiTitle} - Darshanam\`} 
        description={\`Explore Bhagavad Gītā Chapter ${chapterNum} - ${engSubtitle}. Read translations, listen to audio, and discover the meaning.\`} 
      />`;

  content = content.replace(
    /(return\s*\(\s*<div[^>]*>)/,
    `$1\n${seoComponent}`,
  );

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Reset SEO perfectly for ${file}`);
});
