const https = require("https");
const fs = require("fs");

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, (response) => {
        response.pipe(file);
        file.on("finish", () => {
          file.close(resolve);
        });
      })
      .on("error", (err) => {
        fs.unlink(dest);
        reject(err);
      });
  });
};

const urls = [
  {
    url: "https://raw.githubusercontent.com/kashishkhullar/gita_json/master/dataset_hindi.json",
    dest: "gita_hindi.json",
  },
  {
    url: "https://raw.githubusercontent.com/kashishkhullar/gita_json/master/dataset_english.json",
    dest: "gita_english.json",
  },
];

Promise.all(urls.map((item) => download(item.url, item.dest)))
  .then(() => console.log("Downloaded all files"))
  .catch((err) => console.error(err));
