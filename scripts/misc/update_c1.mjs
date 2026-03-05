import fs from "fs";
import https from "https";
import { chapter1Shlokas } from "./src/data/chapter1.js";

const details = JSON.parse(fs.readFileSync("detailed_c1.json", "utf-8"));

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

async function run() {
  console.log("Starting execution...");
  let newShlokas = [];

  for (let i = 0; i < chapter1Shlokas.length; i++) {
    const shloka = chapter1Shlokas[i];
    console.log(`Translating Chapter 1, Shloka ${shloka.num}...`);

    let enhanced = { ...shloka };

    // Inject detailed meanings
    if (details[shloka.num]) {
      enhanced.hindi_meaning = details[shloka.num].hindi_meaning;
      enhanced.meaning = details[shloka.num].meaning;
    } else {
      console.log(`Missing detailed meanings for shloka ${shloka.num}`);
    }

    // Re-translate consistently
    for (const lang of langs) {
      enhanced[lang] = await translateText(enhanced.english, langCodes[lang]);
      enhanced[`${lang}_meaning`] = await translateText(
        enhanced.meaning,
        langCodes[lang],
      );
    }

    newShlokas.push(enhanced);
    await new Promise((r) => setTimeout(r, 200)); // anti-ratelimit
  }

  const fileOutput = `export const chapter1Shlokas = ${JSON.stringify(newShlokas, null, 2)};\n`;
  fs.writeFileSync("src/data/chapter1.js", fileOutput, "utf-8");
  console.log("Finished updating chapter1.js!");
}

run();
