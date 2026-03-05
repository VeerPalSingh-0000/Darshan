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
  const actualStart = content.indexOf("[", startIndex);
  let braceCount = 0;
  let inArray = false;
  let endIndex = -1;
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

async function run() {
  fs.writeFileSync("log.txt", "Reading...\n");
  const content = fs.readFileSync("src/data/chapter1.js", "utf-8");
  const shlokas = extractArray(content, "chapter1Shlokas");
  const details = JSON.parse(fs.readFileSync("detailed_c1.json", "utf-8"));
  const langs = ["tamil", "bengali", "spanish"];
  const langCodes = { tamil: "ta", bengali: "bn", spanish: "es" };

  let newShlokas = [];
  for (let i = 0; i < shlokas.length; i++) {
    let enhanced = { ...shlokas[i] };
    if (details[enhanced.num]) {
      enhanced.hindi_meaning = details[enhanced.num].hindi_meaning;
      enhanced.meaning = details[enhanced.num].meaning;
    }

    for (const lang of langs) {
      enhanced[lang] = await translateText(enhanced.english, langCodes[lang]);
      enhanced[`${lang}_meaning`] = await translateText(
        enhanced.meaning,
        langCodes[lang],
      );
    }
    newShlokas.push(enhanced);
    fs.appendFileSync("log.txt", `Done shloka ${enhanced.num}\n`);
  }

  fs.writeFileSync(
    "src/data/chapter1.js",
    `export const chapter1Shlokas = ${JSON.stringify(newShlokas, null, 2)};\n`,
    "utf-8",
  );
  fs.appendFileSync("log.txt", "COMPLETED\n");
}

run().catch((e) => fs.writeFileSync("log.txt", e.stack));
