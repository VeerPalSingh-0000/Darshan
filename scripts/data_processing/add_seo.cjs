const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "../../src/Pages/Gita/Chapters");
if (!fs.existsSync(dir)) {
  console.error("Directory not found:", dir);
  process.exit(1);
}

const files = fs
  .readdirSync(dir)
  .filter((f) => f.startsWith("Adhyay") && f.endsWith(".jsx"));

files.forEach((file) => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, "utf8");

  // Skip if already has SEO
  if (content.includes("import SEO")) return;

  // Add import
  const importStatement = 'import SEO from "../../../components/SEO";\n';
  content = content.replace(/(import React.*?;\n)/, `$1${importStatement}`);

  // Extract Adhyay num from filename (e.g. Adhyay1.jsx)
  const match = file.match(/Adhyay(\d+)/);
  const chapterNum = match ? match[1] : "";

  // Extract Hindi title if we can find it
  const titleMatch = content.match(
    /<motion\.h1[^>]*>\s*([^<]+)\s*<\/motion\.h1>/,
  );
  const hindiTitle = titleMatch
    ? titleMatch[1].trim()
    : `Chapter ${chapterNum}`;

  // Extract English subtitle
  const subtitleMatch = content.match(
    /<motion\.h2[^>]*>\s*([^<]+)\s*<\/motion\.h2>/,
  );
  const engSubtitle = subtitleMatch ? subtitleMatch[1].trim() : `Translation`;

  // Construct SEO component
  const seoComponent = `      <SEO 
        title={\`Bhagavad Gītā Chapter ${chapterNum}: ${hindiTitle} - Darshanam\`} 
        description={\`Explore Bhagavad Gītā Chapter ${chapterNum} - ${engSubtitle}. Read translations, listen to audio, and discover the meaning.\`} 
      />`;

  // Inject SEO directly after the root div following return (
  content = content.replace(
    /(return\s*\([^<]*<div[^>]*>)/,
    `$1\n${seoComponent}`,
  );

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Updated SEO for ${file}`);
});

console.log("SEO component added to all Adhyay files.");
