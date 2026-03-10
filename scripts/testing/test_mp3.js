const https = require("https");
const url = "https://www.holy-bhagavad-gita.org/chapter/2/verse/47";

const req = https.get(
  url,
  { headers: { "User-Agent": "Mozilla/5.0" } },
  (res) => {
    let html = "";
    res.on("data", (chunk) => (html += chunk));
    res.on("end", () => {
      let matches = html.match(/https?:\/\/[a-zA-Z0-9.\-/_]+\.mp3/gi);
      let partial = html.match(/\/public[a-zA-Z0-9.\-/_]+\.mp3/gi);
      console.log("Full URLs", matches);
      console.log("Partial URLs", partial);
    });
  },
);
req.on("error", (e) => console.error(e));
