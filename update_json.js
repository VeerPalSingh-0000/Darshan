const fs = require('fs');

const data = JSON.parse(fs.readFileSync('bhagavad_gita_chapter_1.json', 'utf8'));

data.forEach(shloka => {
  if (shloka.translations) {
    for (const lang in shloka.translations) {
      const trans = shloka.translations[lang];
      // Only merge if they haven't been merged yet
      if (trans.philosophical_meaning && trans.practical_meaning && trans.key_lesson && !trans.key_lesson.includes(trans.philosophical_meaning)) {
        trans.key_lesson = `${trans.philosophical_meaning} ${trans.practical_meaning} In essence: ${trans.key_lesson}`;
      }
    }
  }
});

fs.writeFileSync('bhagavad_gita_chapter_1.json', JSON.stringify(data, null, 2));
