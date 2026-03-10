const fs = require("fs");
for (let i = 1; i <= 18; i++) {
  const path = `c:/Users/Veer Pal Singh/Desktop/Darshanam/src/Pages/Gita/Chapters/Adhyay${i}.jsx`;
  if (fs.existsSync(path)) {
    let content = fs.readFileSync(path, "utf8");
    // Even looser
    const regex =
      /audioUrl=\{\s*`https:\/\/www\.holy-bhagavad-gita\.org\/public\/audio\/[^`]+`\s*\}/g;
    if (regex.test(content)) {
      content = content.replace(regex, `ref={\`${i}.\${shloka.num}\`}`);
      fs.writeFileSync(path, content);
      console.log(`Updated Adhyay${i}.jsx`);
    } else {
      console.log(`Regex did not match in Adhyay${i}.jsx`);
    }
  }
}
