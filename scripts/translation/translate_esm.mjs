import fs from "fs";
import https from "https";
import { chapter1Shlokas as c1 } from "./src/data/chapter1.js";
import { chapter2Shlokas as c2 } from "./src/data/chapter2.js";

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

const langs = ["tamil", "bengali", "spanish"];
const langCodes = { tamil: "ta", bengali: "bn", spanish: "es" };

async function processShlokas(shlokas, arrayName, filepath) {
  console.log(`Processing ${filepath}`);
  fs.appendFileSync("status.mjs.txt", `Processing ${filepath}\n`);

  let newShlokas = [];
  for (let i = 0; i < shlokas.length; i++) {
    const shloka = shlokas[i];
    console.log(`Translating shloka ${shloka.num}...`);
    fs.appendFileSync(
      "status.mjs.txt",
      `Translating shloka ${shloka.num}...\n`,
    );

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
    await new Promise((r) => setTimeout(r, 100)); // anti-ratelimit
  }

  const fileOutput = `export const ${arrayName} = ${JSON.stringify(newShlokas, null, 2)};\n`;
  fs.writeFileSync(filepath, fileOutput, "utf-8");
  console.log(`Finished ${filepath}`);
  fs.appendFileSync("status.mjs.txt", `Finished ${filepath}\n`);
}

async function run() {
  fs.writeFileSync("status.mjs.txt", "Started execution\n");
  try {
    await processShlokas(c1, "chapter1Shlokas", "src/data/chapter1.js");
    await processShlokas(c2, "chapter2Shlokas", "src/data/chapter2.js");
    fs.appendFileSync("status.mjs.txt", "All done!\n");
    console.log("All done!");
  } catch (e) {
    fs.appendFileSync("status.mjs.txt", `Error: ${e.message}\n${e.stack}\n`);
    console.log(e);
  }
}

run();
