const fs = require("fs");
const https = require("https");

async function translateText(text, targetLang) {
  if (!text) return text;
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;

  return new Promise((resolve) => {
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

function extractArray(content, arrayName) {
  const startIndex = content.indexOf(`export const ${arrayName} = [`);
  let braceCount = 0;
  let inArray = false;
  let endIndex = -1;
  const actualStart = content.indexOf("[", startIndex);

  for (let i = actualStart; i < content.length; i++) {
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

  const arrayStr = content.substring(actualStart, endIndex + 1);
  return eval(`(${arrayStr})`); // WARNING: eval used locally.
}

async function processFile(filePath, arrayName) {
  fs.appendFileSync("status.txt", `Processing ${filePath}...\n`);
  const content = fs.readFileSync(filePath, "utf-8");
  let shlokas;
  try {
    shlokas = extractArray(content, arrayName);
  } catch (e) {
    fs.appendFileSync(
      "status.txt",
      `Error parsing array in ${filePath}: ${e.message}\n`,
    );
    return;
  }

  const langs = ["tamil", "bengali", "spanish"];
  const langCodes = { tamil: "ta", bengali: "bn", spanish: "es" };

  let newShlokas = [];
  for (let i = 0; i < shlokas.length; i++) {
    const shloka = shlokas[i];
    if (i % 10 === 0)
      fs.appendFileSync("status.txt", `Translating shloka ${shloka.num}...\n`);
    let enhanced = { ...shloka };

    if (!enhanced.hindi_meaning) enhanced.hindi_meaning = enhanced.hindi || "";
    if (!enhanced.meaning) enhanced.meaning = enhanced.english || "";

    for (const lang of langs) {
      if (!enhanced[lang]) {
        enhanced[lang] = await translateText(shloka.english, langCodes[lang]);
      }
      if (!enhanced[`${lang}_meaning`]) {
        enhanced[`${lang}_meaning`] = await translateText(
          enhanced.meaning,
          langCodes[lang],
        );
      }
    }

    newShlokas.push(enhanced);
    await new Promise((r) => setTimeout(r, 200));
  }

  const fileOutput = `export const ${arrayName} = ${JSON.stringify(newShlokas, null, 2)};\n`;
  fs.writeFileSync(filePath, fileOutput, "utf-8");
  fs.appendFileSync("status.txt", `Finished ${filePath}\n`);
}

async function run() {
  fs.writeFileSync("status.txt", "Starting script...\n");
  await processFile("src/data/chapter1.js", "chapter1Shlokas");
  await processFile("src/data/chapter2.js", "chapter2Shlokas");
  fs.appendFileSync("status.txt", "All done!\n");
}

run();
