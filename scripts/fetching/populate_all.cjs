const fs = require("fs");

async function go() {
  try {
    const hindiRes = await fetch(
      "https://raw.githubusercontent.com/kashishkhullar/gita_json/master/dataset_hindi.json",
    );
    const hindi = await hindiRes.json();
    const engRes = await fetch(
      "https://raw.githubusercontent.com/kashishkhullar/gita_json/master/dataset_english.json",
    );
    const eng = await engRes.json();

    fs.writeFileSync(
      "gita_keys.txt",
      JSON.stringify({ hindi: hindi[0], eng: eng[0] }, null, 2),
    );
  } catch (e) {
    fs.writeFileSync("gita_keys.txt", "Error: " + e.message);
  }
}
go();
