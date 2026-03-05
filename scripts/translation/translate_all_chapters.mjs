import fs from "fs";
import https from "https";
import { pathToFileURL } from "url";

async function translate(text, targetLang) {
  if (!text || !text.trim()) return "";
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text.trim())}`;

  for (let attempts = 0; attempts < 3; attempts++) {
    try {
      const data = await new Promise((resolve, reject) => {
        https
          .get(url, (res) => {
            if (res.statusCode >= 400)
              return reject(new Error("Status: " + res.statusCode));
            let body = "";
            res.on("data", (c) => (body += c));
            res.on("end", () => resolve(body));
          })
          .on("error", reject);
      });
      const json = JSON.parse(data);
      let translated = "";
      if (json && json[0]) {
        json[0].forEach((item) => {
          if (item[0]) translated += item[0];
        });
      }
      return translated || text;
    } catch (err) {
      await new Promise((r) => setTimeout(r, 1000 * (attempts + 1)));
    }
  }
  return text;
}

async function run() {
  let langs = [
    { key: "tamil", langCode: "ta", srcKey: "english" },
    { key: "tamil_meaning", langCode: "ta", srcKey: "meaning" },
    { key: "bengali", langCode: "bn", srcKey: "english" },
    { key: "bengali_meaning", langCode: "bn", srcKey: "meaning" },
    { key: "spanish", langCode: "es", srcKey: "english" },
    { key: "spanish_meaning", langCode: "es", srcKey: "meaning" },
  ];

  for (let c = 1; c <= 18; c++) {
    const p = `c:\\Users\\Veer Pal Singh\\Desktop\\Darshanam\\src\\data\\chapter${c}.js`;
    if (!fs.existsSync(p)) continue;

    const fileUrl = pathToFileURL(p).href;
    const module = await import(fileUrl + "?t=" + Date.now());
    const varName = `chapter${c}Shlokas`;
    let shlokas = module[varName];
    if (!shlokas || !Array.isArray(shlokas)) continue;

    console.log(`Checking chapter ${c} (Total ${shlokas.length} shlokas)`);
    let chapterModified = false;

    for (let i = 0; i < shlokas.length; i++) {
      let s = shlokas[i];
      let modified = false;

      for (let lang of langs) {
        if (!s[lang.key] || s[lang.key].trim() === "") {
          // Try to translate
          let src = s[lang.srcKey];
          // Fallbacks if primary source is missing
          if (!src || src.trim() === "") {
            if (lang.srcKey === "meaning")
              src = s["hindi_meaning"] || s["hindi"] || s["english"];
            else src = s["hindi"] || s["meaning"];
          }

          if (src && src.trim() !== "") {
            let t = await translate(src, lang.langCode);
            s[lang.key] = t;
            modified = true;
            chapterModified = true;
            await new Promise((r) => setTimeout(r, 150)); // Delay to not overload Google Translate
          }
        }
      }
      if (modified) {
        console.log(`- Translated shloka ${s.num} in chapter ${c}`);
      }
    }

    if (chapterModified) {
      let safeOut = `export const ${varName} = ${JSON.stringify(shlokas, null, 2)};\n`;
      fs.writeFileSync(p, safeOut, "utf-8");
      console.log(`Saved translations for chapter ${c}.`);
    } else {
      console.log(`No new translations needed for chapter ${c}.`);
    }
  }
  console.log("All complete!");
}
run();
