import https from "https";

https.get("https://www.holy-bhagavad-gita.org/chapter/2/verse/47", (res) => {
  let data = "";
  res.on("data", (d) => (data += d));
  res.on("end", () => {
    // console.log(data);
    const matches =
      data.match(/src="([^"]+\.mp3)"/g) ||
      data.match(/href="([^"]+\.mp3)"/g) ||
      data.match(/['"]([^'"]+\.mp3)['"]/g);
    console.log(matches);
  });
});
