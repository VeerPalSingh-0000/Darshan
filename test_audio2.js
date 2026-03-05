const https = require("https");
const fs = require("fs");
const urls = [
  "https://www.holy-bhagavad-gita.org/public/audio/001_001.mp3",
  "https://www.holy-bhagavad-gita.org/public/audio/001_01.mp3",
  "https://www.holy-bhagavad-gita.org/public/audio/01_01.mp3",
  "https://www.holy-bhagavad-gita.org/public/audio/1_1.mp3",
];

async function run() {
  let out = "";
  for (const u of urls) {
    await new Promise((res) => {
      https
        .get(u, (response) => {
          out += `${u} -> ${response.statusCode}\n`;
          res();
        })
        .on("error", (err) => {
          out += `${u} -> Error: ${err.message}\n`;
          res();
        });
    });
  }
  fs.writeFileSync(
    "c:\\Users\\Veer Pal Singh\\Desktop\\Darshanam\\audio_test.txt",
    out,
  );
}
run();
