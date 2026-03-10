const https = require("https");
https.get(
  "https://www.holy-bhagavad-gita.org/chapter/1/verse/1",
  { headers: { "User-Agent": "Mozilla/5.0" } },
  (res) => {
    let d = "";
    res.on("data", (c) => (d += c));
    res.on("end", () => {
      const fs = require("fs");
      fs.writeFileSync(
        "c:\\Users\\Veer Pal Singh\\Desktop\\Darshanam\\html_out.txt",
        d.match(/https?:\/\/[^\s"'<>]+\.mp3/g)?.join("\n") || "no mp3",
      );
    });
  },
);
