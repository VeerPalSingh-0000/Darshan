const https = require("https");

const getJson = (url) => {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(JSON.parse(data)));
      })
      .on("error", reject);
  });
};

async function check() {
  const hindi = await getJson(
    "https://raw.githubusercontent.com/kashishkhullar/gita_json/master/dataset_hindi.json",
  );
  const english = await getJson(
    "https://raw.githubusercontent.com/kashishkhullar/gita_json/master/dataset_english.json",
  );

  console.log("Hindi 0:", hindi[0]);
  console.log("English 0:", english[0]);
}
check();
