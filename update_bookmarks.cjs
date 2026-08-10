const fs = require('fs');
const path = require('path');

const dir = 'src/Pages/Gita/Chapters';
const files = fs.readdirSync(dir).filter(f => f.startsWith('Adhyay') && f.endsWith('.jsx'));

let updatedCount = 0;

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  content = content.replace(
    /const newBookmarks = bookmarks\.includes\(shlokaNum\)\s*\n\s*\?\s*bookmarks\.filter\(\(num\) => num !== shlokaNum\)\s*\n\s*:\s*\[\.\.\.bookmarks, shlokaNum\];/g,
    'const newBookmarks = bookmarks.includes(shlokaNum) ? [] : [shlokaNum];'
  );

  if (!content.includes('id={`verse-${shloka.num}`}')) {
    content = content.replace(
      /key=\{shloka\.num\}/g,
      'key={shloka.num}\n                id={`verse-${shloka.num}`}'
    );
  }

  if (!content.includes('Go to Bookmark')) {
    content = content.replace(
      /<div className="container mx-auto px-4 max-w-5xl">\s*<motion\.div/g,
      `<div className="container mx-auto px-4 max-w-5xl">
          {bookmarks.length > 0 && (
            <div className="flex justify-end mb-6">
              <button
                onClick={() => {
                  const el = document.getElementById(\`verse-\${bookmarks[0]}\`);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 rounded-lg hover:bg-amber-200 dark:hover:bg-amber-900/60 transition-colors shadow-sm"
              >
                <BookmarkSolidIcon className="w-5 h-5" />
                <span className="font-medium">Go to Bookmark (Verse {bookmarks[0]})</span>
              </button>
            </div>
          )}
          <motion.div`
    );
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    updatedCount++;
    console.log(`Updated ${file}`);
  }
});
console.log(`Updated ${updatedCount} files.`);
