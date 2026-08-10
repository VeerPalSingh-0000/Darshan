const fs = require('fs');

async function run() {
  const fileContent = fs.readFileSync('src/data/chapter1.js', 'utf8');
  // Strip the `export const chapter1Shlokas = ` and trailing `;`
  let jsonString = fileContent.replace('export const chapter1Shlokas = ', '').trim();
  if (jsonString.endsWith(';')) jsonString = jsonString.slice(0, -1);
  
  try {
    const data = JSON.parse(jsonString);
    data.forEach(shloka => {
      if (shloka.translations) {
        for (const lang in shloka.translations) {
          const trans = shloka.translations[lang];
          if (trans.philosophical_meaning && trans.practical_meaning && trans.key_lesson && !trans.key_lesson.includes(trans.philosophical_meaning)) {
            if (lang === 'hindi') {
              trans.key_lesson = `${trans.philosophical_meaning} ${trans.practical_meaning} निष्कर्ष: ${trans.key_lesson}`;
            } else {
              trans.key_lesson = `${trans.philosophical_meaning} ${trans.practical_meaning} In essence: ${trans.key_lesson}`;
            }
          }
        }
      }
    });

    const newContent = `export const chapter1Shlokas = ${JSON.stringify(data, null, 2)};\n`;
    fs.writeFileSync('src/data/chapter1.js', newContent);
    console.log("Success!");
  } catch (e) {
    console.error("Parse failed:", e);
  }
}
run();
