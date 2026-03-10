const https = require("https");

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "NodeJS/Darshanam" } }, (res) => {
        let body = "";
        res.on("data", (d) => (body += d));
        res.on("end", () => {
          try {
            resolve(JSON.parse(body));
          } catch (e) {
            reject(e);
          }
        });
      })
      .on("error", reject);
  });
}

fetchJson(
  "https://raw.githubusercontent.com/kashishkhullar/gita_json/master/dataset_hindi.json",
)
  .then((data) => {
    console.log("Verses keys:", Object.keys(data.verses).slice(0, 5));
    console.log("Verses['1'] keys:", Object.keys(data.verses["1"]).slice(0, 5));
  })
  .catch((err) => console.error(err));
