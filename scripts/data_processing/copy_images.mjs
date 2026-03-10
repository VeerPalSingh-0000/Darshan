import fs from "fs";
import path from "path";

const srcDir =
  "c:/Users/Veer Pal Singh/Desktop/Darshanam/src/Pages/Schools-images";
const destDir =
  "c:/Users/Veer Pal Singh/Desktop/Darshanam/public/school-images";

const files = ["kapila.png", "prakriti.png", "purusha.png"];

files.forEach((file) => {
  const src = path.join(srcDir, file);
  const dest = path.join(destDir, file);
  if (fs.existsSync(src)) {
    try {
      fs.copyFileSync(src, dest);
      console.log(`Copied ${src} to ${dest}`);
    } catch (err) {
      console.error(`Error copying ${src}:`, err);
    }
  } else {
    console.log(`Source ${src} not found`);
  }
});
