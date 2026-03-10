import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = __dirname;
const testingDir = path.join(rootDir, "scripts", "testing");
const dataProcessingDir = path.join(rootDir, "scripts", "data_processing");

// Ensure directories exist
if (!fs.existsSync(testingDir)) {
  fs.mkdirSync(testingDir, { recursive: true });
}
if (!fs.existsSync(dataProcessingDir)) {
  fs.mkdirSync(dataProcessingDir, { recursive: true });
}

const files = fs.readdirSync(rootDir);

const testingFiles = files.filter(
  (f) =>
    f.startsWith("test") &&
    (f.endsWith(".py") ||
      f.endsWith(".js") ||
      f.endsWith(".cjs") ||
      f.endsWith(".mjs")),
);
const dataProcessingFiles = [
  "copy_gen_images.py",
  "copy_images.mjs",
  "move_imgs.bat",
  "update_adhyays.cjs",
  "update_adhyays_final.cjs",
  "build_corpus.cjs",
];
const trashFiles = [
  "console.log(b))",
  "{",
  "build_error.txt",
  "gita_log.txt",
  "html_out.txt",
  ".env", // Only deleting .env (stub), keeping .env.local
];

// Move testing files
testingFiles.forEach((f) => {
  const source = path.join(rootDir, f);
  const dest = path.join(testingDir, f);
  if (fs.existsSync(source)) {
    fs.renameSync(source, dest);
    console.log(`Moved ${f} to scripts/testing`);
  }
});

// Move data processing files
dataProcessingFiles.forEach((f) => {
  const source = path.join(rootDir, f);
  const dest = path.join(dataProcessingDir, f);
  if (fs.existsSync(source)) {
    fs.renameSync(source, dest);
    console.log(`Moved ${f} to scripts/data_processing`);
  }
});

// Delete trash files
trashFiles.forEach((f) => {
  const source = path.join(rootDir, f);
  if (fs.existsSync(source)) {
    fs.unlinkSync(source);
    console.log(`Deleted ${f}`);
  }
});

console.log("\nCleanup complete and perfectly organized!");
