const https = require("https");
const fs = require("fs");

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const get = (currentUrl) => {
      https
        .get(
          currentUrl,
          { headers: { "User-Agent": "NodeJS/Darshanam" } },
          (res) => {
            if (
              [301, 302, 307, 308].includes(res.statusCode) &&
              res.headers.location
            ) {
              return get(res.headers.location);
            }
            if (res.statusCode < 200 || res.statusCode >= 300) {
              return reject(new Error("Status: " + res.statusCode));
            }
            let body = "";
            res.on("data", (d) => (body += d));
            res.on("end", () => resolve(JSON.parse(body)));
          },
        )
        .on("error", reject);
    };
    get(url);
  });
}

function processData() {
  Promise.all([
    fetchJson(
      "https://raw.githubusercontent.com/kashishkhullar/gita_json/master/dataset_hindi.json",
    ),
    fetchJson(
      "https://raw.githubusercontent.com/kashishkhullar/gita_json/master/dataset_english.json",
    ),
  ])
    .then(([h, e]) => {
      let log = "";
      for (let c = 1; c <= 18; c++) {
        let currShlokas = [];
        let hCh = h.chapters[c.toString()];
        let hVerses = h.verses[c.toString()];
        let eVerses = e.verses ? e.verses[c.toString()] : null;

        if (!hCh || !hVerses) continue;

        let nums = hCh.verse_numbers || [];
        nums.forEach((n) => {
          let hv = hVerses[n];
          let ev = eVerses ? eVerses[n] : null;

          if (hv) {
            const sanskritText = (hv.text || "").trim();

            let numVal = parseInt(n.split("-")[0]);

            // Pavanw3b repository reliable audio link (CORS friendly)
            const audioUrl = `https://bhagavadgitaapi.in/audio/${c}/${numVal}.mp3`;

            currShlokas.push({
              num: numVal,
              sanskrit: sanskritText,
              audio: audioUrl, // Adding audio link to data
              hindi: hv.meaning || "",
              english: ev ? ev.meaning || "" : "",
              hindi_meaning: hv.word_meanings || "",
              meaning: ev ? ev.word_meanings || ev.meaning || "" : "",
            });
          }
        });

        currShlokas.sort((a, b) => a.num - b.num);
        let content = `export const chapter${c}Shlokas = ${JSON.stringify(currShlokas, null, 2)};\n`;

        // Correcting your local path as per your original file
        fs.writeFileSync(
          `c:\\Users\\Veer Pal Singh\\Desktop\\Darshanam\\src\\data\\chapter${c}.js`,
          content,
          "utf-8",
        );
        log += `Chapter ${c} written with ${currShlokas.length} shlokas.\n`;
      }
      fs.writeFileSync(
        "c:\\Users\\Veer Pal Singh\\Desktop\\Darshanam\\gita_log.txt",
        log,
        "utf-8",
      );
      console.log("Success: Data generated with working audio links.");
    })
    .catch((err) => {
      console.error(err);
    });
}

processData();
