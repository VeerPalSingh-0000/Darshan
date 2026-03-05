const https = require("https");

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "NodeJS/Darshanam" } }, (res) => {
        console.log(`Status for ${url}: ${res.statusCode}`);
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
  .then((data) =>
    console.log("Data fetched length:", JSON.stringify(data).length),
  )
  .catch((err) => console.error("Error:", err));
