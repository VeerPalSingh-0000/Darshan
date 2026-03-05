import fs from "fs";
import { chapter1Shlokas } from "./src/data/chapter1.js";
console.log(chapter1Shlokas.length);
fs.writeFileSync("check.txt", "ok " + chapter1Shlokas.length);
