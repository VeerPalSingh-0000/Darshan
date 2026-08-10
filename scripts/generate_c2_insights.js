import fs from 'fs';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { chapter2Shlokas } from '../src/data/chapter2.js';

// Load .env.local for API key
dotenv.config({ path: '.env.local' });

const ai = new GoogleGenAI({ apiKey: process.env.VITE_GEMINI_API_KEY });

async function analyzeShloka(shloka) {
  const prompt = `
You are a Bhagavad Gita expert. Analyze the following shloka and provide a structured response with its literal meaning and a key lesson in both English and Hindi.

Sanskrit: ${shloka.sanskrit}
English Translation: ${shloka.english}
Word Meaning: ${shloka.meaning}

Provide a JSON response with exactly these fields:
1. "english_literal_meaning": A beginner-friendly, 1-2 sentence context of what is physically happening or being said in the shloka.
2. "english_key_lesson": A 2-4 sentence philosophical and practical lesson derived from the shloka. Format it ending with a summary like this: "[Philosophy]. [Practical]. In essence: [Short summary]."
3. "hindi_literal_meaning": Same as 1 but in simple, natural Hindi.
4. "hindi_key_lesson": Same as 2 but in Hindi, ending with "निष्कर्ष: [Short summary]."
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text;
    const parsed = JSON.parse(text);
    return parsed;
  } catch (error) {
    console.error(`Error analyzing shloka ${shloka.num}:`, error);
    return null;
  }
}

async function run() {
  console.log('Starting Chapter 2 analysis...');
  const newShlokas = [];
  
  // Process sequentially to avoid 15 RPM rate limits
  const batchSize = 1;
  for (let i = 0; i < chapter2Shlokas.length; i += batchSize) {
    const batch = chapter2Shlokas.slice(i, i + batchSize);
    console.log(`Processing shlokas ${i + 1} to ${Math.min(i + batchSize, chapter2Shlokas.length)}...`);
    
    const promises = batch.map(async (shloka) => {
      // Create a copy of the shloka to avoid mutating the original import
      const enhanced = { ...shloka };
      
      // Initialize translations if it doesn't exist
      if (!enhanced.translations) {
        enhanced.translations = {
          english: {},
          hindi: {}
        };
      }
      
      // Skip if already has literal meaning and key lesson
      if (enhanced.translations.english.literal_meaning && enhanced.translations.english.key_lesson) {
        return enhanced;
      }
      
      const analysis = await analyzeShloka(enhanced);
      if (analysis) {
        enhanced.translations.english.literal_meaning = analysis.english_literal_meaning;
        enhanced.translations.english.key_lesson = analysis.english_key_lesson;
        enhanced.translations.hindi.literal_meaning = analysis.hindi_literal_meaning;
        enhanced.translations.hindi.key_lesson = analysis.hindi_key_lesson;
      }
      
      return enhanced;
    });
    
    const processedBatch = await Promise.all(promises);
    newShlokas.push(...processedBatch);
    
    // 4.5 seconds pause to respect 15 RPM limit
    await new Promise(resolve => setTimeout(resolve, 4500));
  }

  const jsContent = `export const chapter2Shlokas = ${JSON.stringify(newShlokas, null, 2)};\n`;
  fs.writeFileSync('src/data/chapter2.js', jsContent, 'utf-8');
  console.log('Successfully completed Chapter 2 analysis and saved to src/data/chapter2.js');
}

run();
