const https = require("https");
const fs = require("fs");
const path = require("path");

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          return resolve(get(res.headers.location));
        }
        let data = "";
        res.on("data", (c) => {
          data += c;
        });
        res.on("end", () => {
          resolve(data);
        });
      })
      .on("error", reject);
  });
}

async function run() {
  try {
    const hindi = await get(
      "https://raw.githubusercontent.com/kashishkhullar/gita_json/master/dataset_hindi.json",
    );
    fs.writeFileSync(
      "c:\\Users\\Veer Pal Singh\\Desktop\\Darshanam\\hindi_out.txt",
      hindi.substring(0, 500),
      "utf-8",
    );

    // Also parse it and log structure
    const parsed = JSON.parse(hindi);
    let str = "Keys: " + Object.keys(parsed).join(",") + "\n";
    if (parsed.chapters) {
      str += "Chapters keys: " + Object.keys(parsed.chapters).join(",") + "\n";
    }
    if (parsed.verses) {
      str +=
        "Verses length: " +
        (Array.isArray(parsed.verses)
          ? parsed.verses.length
          : Object.keys(parsed.verses).length) +
        "\n";
      const sampleVerse = Array.isArray(parsed.verses)
        ? parsed.verses[0]
        : parsed.verses[Object.keys(parsed.verses)[0]];
      str += "Verse keys: " + Object.keys(sampleVerse).join(",") + "\n";
    }
    fs.writeFileSync(
      "c:\\Users\\Veer Pal Singh\\Desktop\\Darshanam\\struct_out.txt",
      str,
      "utf-8",
    );
  } catch (e) {
    fs.writeFileSync(
      "c:\\Users\\Veer Pal Singh\\Desktop\\Darshanam\\hindi_out.txt",
      e.toString(),
      "utf-8",
    );
  }
}

run();
