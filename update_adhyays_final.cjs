const fs = require("fs");
const path = require("path");

const dir = "c:/Users/Veer Pal Singh/Desktop/Darshanam/src/Pages/Gita/Chapters";
for (let i = 1; i <= 18; i++) {
  const filePath = path.join(dir, `Adhyay${i}.jsx`);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, "utf8");
    // Search for SpeakButton with ref prop and change it to audioUrl={shloka.audio}
    const regex =
      /<SpeakButton\s+text=\{shloka\.sanskrit\}\s+ref=\{`\d+\.\${shloka\.num}`\}\s*\/>/g;
    const newContent = content.replace(
      regex,
      "<SpeakButton\n                        text={shloka.sanskrit}\n                        audioUrl={shloka.audio}\n                      />",
    );

    // Also handle cases if they have different spacing
    const regex2 =
      /<SpeakButton\s+text=\{shloka\.sanskrit\}\s+audioUrl=\{`https:\/\/www\.holy-bhagavad-gita\.org\/public\/audio\/[^`]+`\}\s*\/>/g;
    const finalContent = newContent.replace(
      regex2,
      "<SpeakButton\n                        text={shloka.sanskrit}\n                        audioUrl={shloka.audio}\n                      />",
    );

    fs.writeFileSync(filePath, finalContent);
    console.log(`Updated Adhyay${i}.jsx`);
  }
}
