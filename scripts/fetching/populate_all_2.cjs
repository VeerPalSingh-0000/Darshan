const https = require("https");
const fs = require("fs");

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          resolve(fetchUrl(res.headers.location));
        } else {
          let body = "";
          res.on("data", (d) => (body += d));
          res.on("end", () => resolve(JSON.parse(body)));
        }
      })
      .on("error", reject);
  });
}

async function go() {
  try {
    const hindi = await fetchUrl(
      "https://raw.githubusercontent.com/kashishkhullar/gita_json/master/dataset_hindi.json",
    );
    const english = await fetchUrl(
      "https://raw.githubusercontent.com/kashishkhullar/gita_json/master/dataset_english.json",
    );

    fs.writeFileSync(
      "gita_keys.txt",
      JSON.stringify({ hindi: hindi[0], eng: english[0] }, null, 2),
    );
  } catch (e) {
    fs.writeFileSync("gita_keys.txt", "Error: " + e.message);
  }
}
go();
