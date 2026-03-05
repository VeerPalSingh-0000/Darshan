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

function processModuleFile(filePath, arrayName) {
  const content = fs.readFileSync(filePath, "utf-8");
  const tempPath = filePath + ".temp.js";
  const newContent = content.replace(
    `export const ${arrayName} =`,
    "module.exports =",
  );
  fs.writeFileSync(tempPath, newContent, "utf-8");

  // require the temp file
  const shlokas = require("./" + tempPath);
  fs.unlinkSync(tempPath);
  return shlokas;
}

async function run() {
  fs.writeFileSync("status.txt", "Started execution\n");
  const files = [
    { path: "src/data/chapter1.js", name: "chapter1Shlokas" },
    { path: "src/data/chapter2.js", name: "chapter2Shlokas" },
  ];

  const langs = ["tamil", "bengali", "spanish"];
  const langCodes = { tamil: "ta", bengali: "bn", spanish: "es" };

  for (const file of files) {
    fs.appendFileSync("status.txt", `Processing ${file.path}\n`);
    let shlokas;
    try {
      shlokas = processModuleFile(file.path, file.name);
    } catch (e) {
      fs.appendFileSync(
        "status.txt",
        `Error requiring ${file.path}: ${e.message}\n`,
      );
      continue;
    }

    let newShlokas = [];
    for (let i = 0; i < shlokas.length; i++) {
      const shloka = shlokas[i];
      fs.appendFileSync(
        "status.txt",
        `Translating ${file.name} shloka ${shloka.num}...\n`,
      );

      let enhanced = { ...shloka };

      if (!enhanced.hindi_meaning)
        enhanced.hindi_meaning = enhanced.hindi || "";
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
      // sleep to avoid 429
      await new Promise((r) => setTimeout(r, 100));
    }

    const fileOutput = `export const ${file.name} = ${JSON.stringify(newShlokas, null, 2)};\n`;
    fs.writeFileSync(file.path, fileOutput, "utf-8");
    fs.appendFileSync("status.txt", `Finished ${file.path}\n`);
  }
  fs.appendFileSync("status.txt", "All done!\n");
}

run().catch((e) => {
  fs.appendFileSync("status.txt", `Global error: ${e.message}\n`);
});
