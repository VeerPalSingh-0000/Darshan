const fs = require("fs");
const https = require("https");

const getJson = (url) => {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            resolve(null);
          }
        });
      })
      .on("error", reject);
  });
};

async function execute() {
  const hindi = await getJson(
    "https://raw.githubusercontent.com/kashishkhullar/gita_json/master/dataset_hindi.json",
  );
  const english = await getJson(
    "https://raw.githubusercontent.com/kashishkhullar/gita_json/master/dataset_english.json",
  );

  const sampleHindi = hindi ? hindi[0] : "null";
  const sampleEnglish = english ? english[0] : "null";

  fs.writeFileSync(
    "gita_dump.txt",
    JSON.stringify({ hindi: sampleHindi, english: sampleEnglish }, null, 2),
    "utf-8",
  );
}

execute();
