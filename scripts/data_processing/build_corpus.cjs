const fs = require("fs");
const path = require("path");

async function buildCorpus() {
  const corpus = [];
  const dataDir = path.join(__dirname, "src", "data");
  const files = fs
    .readdirSync(dataDir)
    .filter(
      (f) =>
        f.startsWith("chapter") && (f.endsWith(".js") || f.endsWith(".cjs")),
    );

  for (const file of files) {
    const chapterMatch = file.match(/chapter(\d+)/);
    if (!chapterMatch) continue;

    const chapterNum = parseInt(chapterMatch[1]);
    const filePath = path.join(dataDir, file);

    // We need to read the file content and parse it safely, or use require if it's CJS.
    // If it's ES module, we could use dynamic import, but we're in cjs script.

    try {
      const fileContent = fs.readFileSync(filePath, "utf-8");

      // Simple regex extraction since it might be an ES module exporting a const array
      // It typically looks like: export const chapter16Shlokas = [ { ... } ];
      // We will just dynamically import it if we use standard node imports.
      // Easiest is to use dynamic import() which works in Node.
    } catch (e) {
      console.error("Error reading file", file, e);
    }
  }
}

// Write the dynamic import wrapper instead
(async () => {
  try {
    const corpus = [];
    for (let i = 1; i <= 18; i++) {
      const modulePath = `file://${path.resolve(__dirname, "src", "data", `chapter${i}.js`)}`;
      try {
        const module = await import(modulePath);
        const exportKey = Object.keys(module).find(
          (k) =>
            k.includes("hapk") || k.includes("hloka") || k.includes("hapter"),
        );
        const shlokas = module[exportKey] || module.default;

        if (Array.isArray(shlokas)) {
          shlokas.forEach((shloka) => {
            corpus.push({
              id: `gita-${i}-${shloka.num || shloka.shloka}`,
              chapter: i,
              verse: shloka.num || shloka.shloka,
              sanskrit: shloka.sanskrit || "",
              english_translation: shloka.english || shloka.translation || "",
              english_meaning: shloka.meaning || shloka.english_meaning || "",
              hindi_translation: shloka.hindi || "",
              hindi_meaning: shloka.hindi_meaning || "",
            });
          });
        }
      } catch (e) {
        console.log(`Could not load chapter ${i}: ${e.message}`);
      }
    }

    const outPath = path.join(__dirname, "gita_corpus.json");
    fs.writeFileSync(outPath, JSON.stringify(corpus, null, 2));
    console.log(
      `Successfully extracted ${corpus.length} verses into gita_corpus.json`,
    );
  } catch (err) {
    console.error(err);
  }
})();
