const https = require("https");
const urls = [
  "https://www.holy-bhagavad-gita.org/public/audio/001_001.mp3",
  "https://www.holy-bhagavad-gita.org/public/audio/001_01.mp3",
  "https://www.holy-bhagavad-gita.org/public/audio/01_01.mp3",
  "https://www.holy-bhagavad-gita.org/public/audio/1_1.mp3",
];

const fs = require("fs");
let log = "";

urls.forEach((u) => {
  https.get(u, (res) => {
    log += `${u}: ${res.statusCode}\n`;
    if (log.split("\n").length === urls.length + 1) {
      fs.writeFileSync("audio_test.txt", log);
    }
  });
});
