const fs = require("fs");
const https = require("https");

async function translateText(text, targetLang) {
  if (!text) return text;
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;

  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const json = JSON.parse(data);
            let translated = "";
            if (json && json[0]) {
              json[0].forEach((item) => {
                if (item[0]) translated += item[0];
              });
            }
            resolve(translated || text);
          } catch (e) {
            resolve(text);
          }
        });
      })
      .on("error", () => {
        resolve(text);
      });
  });
}

// Just mock or extract the array directly using eval if needed, but safer to parse JSON or just write the script to hit the JSON if we had it.
// I can just output the shlokas explicitly.
// Wait, to safely get the data from Adhyay1.jsx, let's extract it with regex.
const file1 = fs.readFileSync("src/Pages/Gita/Chapters/Adhyay1.jsx", "utf-8");
const file2 = fs.readFileSync("src/Pages/Gita/Chapters/Adhyay2.jsx", "utf-8");

function extractArray(content, arrayName) {
  const startIndex = content.indexOf(`const ${arrayName} = [`);
  let braceCount = 0;
  let inArray = false;
  let endIndex = -1;

  for (let i = startIndex; i < content.length; i++) {
    if (content[i] === "[") {
      if (!inArray) inArray = true;
      braceCount++;
    } else if (content[i] === "]") {
      braceCount--;
      if (braceCount === 0 && inArray) {
        endIndex = i;
        break;
      }
    }
  }

  const arrayStr = content.substring(
    startIndex + content.indexOf("[", startIndex),
    endIndex + 1,
  );
  return eval(arrayStr); // WARNING: eval used locally on trusted files
}

async function processChapter(filename, arrayName, outFile) {
  let shlokas = [];
  try {
    const fileContent = fs.readFileSync(filename, "utf-8");
    shlokas = extractArray(fileContent, arrayName);
  } catch (e) {
    console.log("Error extracting array", arrayName);
    return;
  }
  console.log(`Processing ${arrayName} with ${shlokas.length} shlokas`);

  let newShlokas = [];
  const langs = ["tamil", "bengali", "spanish"];
  const langCodes = { tamil: "ta", bengali: "bn", spanish: "es" };

  for (const shloka of shlokas) {
    console.log(`Translating shloka ${shloka.num}...`);
    let enhanced = { ...shloka };

    // translate english and meaning
    for (const lang of langs) {
      enhanced[lang] = await translateText(shloka.english, langCodes[lang]);
      let meaningText = shloka.meaning || shloka.hindi_meaning || "";
      enhanced[`${lang}_meaning`] = await translateText(
        meaningText,
        langCodes[lang],
      );
    }
    newShlokas.push(enhanced);
  }

  const fileOutput = `export const ${arrayName} = ${JSON.stringify(newShlokas, null, 2)};\n`;
  fs.mkdirSync("src/data", { recursive: true });
  fs.writeFileSync(outFile, fileOutput, "utf-8");
  console.log(`Finished ${outFile}`);
}

async function run() {
  await processChapter(
    "src/Pages/Gita/Chapters/Adhyay1.jsx",
    "chapter1Shlokas",
    "src/data/Chapter1Data.js",
  );
  await processChapter(
    "src/Pages/Gita/Chapters/Adhyay2.jsx",
    "chapter2Shlokas",
    "src/data/Chapter2Data.js",
  );
}

run();
