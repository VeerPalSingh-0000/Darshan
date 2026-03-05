const https = require("https");
function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "NodeJS/Darshanam" } }, (res) => {
        let body = "";
        res.on("data", (d) => (body += d));
        res.on("end", () => resolve(JSON.parse(body)));
      })
      .on("error", reject);
  });
}
async function test() {
  const h = await fetchJson(
    "https://raw.githubusercontent.com/kashishkhullar/gita_json/master/dataset_hindi.json",
  );
  console.log("Chapters['1'] keys:", Object.keys(h.chapters["1"]));
  console.log("Verses['1'] exists:", !!h.verses["1"]);
  if (h.verses["1"]) {
    const v1 = Object.keys(h.verses["1"])[0];
    console.log("First verse in Verses['1']:", v1);
    console.log("Verse data keys:", Object.keys(h.verses["1"][v1]));
  }
}
test();
