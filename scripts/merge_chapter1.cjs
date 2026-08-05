const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '../bhagavad_gita_chapter_1.json');
const jsPath = path.join(__dirname, '../src/data/chapter1.js');

try {
  // 1. Read the JSON file
  const newJsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  // 2. Read the JS file
  let jsContent = fs.readFileSync(jsPath, 'utf8');

  // 3. Extract the array from the JS file
  // It starts with 'export const chapter1Shlokas = ['
  const startStr = 'export const chapter1Shlokas = ';
  const startIndex = jsContent.indexOf(startStr) + startStr.length;
  // It ends with '];' or '];\n'
  const endIndex = jsContent.lastIndexOf(';');
  
  const arrayStr = jsContent.substring(startIndex, endIndex).trim();
  
  // Parse the array string
  const oldData = new Function(`return ${arrayStr}`)();

  // 4. Merge
  oldData.forEach((oldShloka) => {
    const newShloka = newJsonData.find(s => s.shloka === oldShloka.num);
    if (newShloka) {
      oldShloka.speaker = newShloka.speaker;
      oldShloka.translations = newShloka.translations;
    }
  });

  // 5. Write back
  const newJsContent = `export const chapter1Shlokas = ${JSON.stringify(oldData, null, 2)};\n`;
  fs.writeFileSync(jsPath, newJsContent, 'utf8');
  console.log('Successfully merged chapter1 data!');
} catch (error) {
  console.error('Error merging:', error);
}
