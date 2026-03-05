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

function getShlokas() {
  // We'll require a pure JS file containing the array
  const shlokas = require("./chapter1_temp.js");
  return shlokas;
}

async function run() {
  const shlokas = getShlokas();
  console.log("Found " + shlokas.length + " shlokas");

  let newShlokas = [];
  const langs = ["tamil", "bengali", "spanish"];
  const langCodes = { tamil: "ta", bengali: "bn", spanish: "es" };

  for (const shloka of shlokas) {
    process.stdout.write(`Translating shloka ${shloka.num}...`);
    let enhanced = { ...shloka };

    for (const lang of langs) {
      enhanced[lang] = await translateText(shloka.english, langCodes[lang]);
      let meaningText = shloka.meaning || shloka.hindi_meaning || "";
      if (meaningText) {
        enhanced[`${lang}_meaning`] = await translateText(
          meaningText,
          langCodes[lang],
        );
      }
    }
    newShlokas.push(enhanced);
    console.log(" Done");
  }

  const fileOutput = `export const chapter1Shlokas = ${JSON.stringify(newShlokas, null, 2)};\n`;
  fs.mkdirSync("src/data", { recursive: true });
  fs.writeFileSync("src/data/chapter1.js", fileOutput, "utf-8");
  console.log("Finished writing src/data/chapter1.js");
}

run();
