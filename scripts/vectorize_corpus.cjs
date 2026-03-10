require("dotenv").config({ path: ".env.local" });
const fs = require("fs");
const path = require("path");

// NOTE: Please ensure you run `npm install dotenv` if not installed,
// and make sure you have generated 'gita_corpus.json' using 'build_corpus.cjs'

async function embedCorpus() {
  const apiKey = process.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.error("VITE_GEMINI_API_KEY is not defined in .env.local");
    process.exit(1);
  }

  const corpusPath = path.join(__dirname, "gita_corpus.json");
  if (!fs.existsSync(corpusPath)) {
    console.error("gita_corpus.json not found. Run build_corpus.cjs first.");
    process.exit(1);
  }

  const corpus = JSON.parse(fs.readFileSync(corpusPath, "utf8"));
  console.log(
    `Loaded ${corpus.length} verses. Connecting to Gemini text-embedding-004...`,
  );

  const vectorizedCorpus = [];

  // Process in small batches to respect rate limits
  const BATCH_SIZE = 10;

  for (let i = 0; i < corpus.length; i += BATCH_SIZE) {
    const batch = corpus.slice(i, i + BATCH_SIZE);

    console.log(
      `Processing batch ${i / BATCH_SIZE + 1} of ${Math.ceil(corpus.length / BATCH_SIZE)}`,
    );

    try {
      const requests = batch.map((verse) => {
        // We embed the english meaning as the primarily semantic representation
        const textToEmbed = `Chapter ${verse.chapter}, Verse ${verse.verse}: ${verse.english_translation} ${verse.english_meaning}`;

        return fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              model: "models/text-embedding-004",
              content: { parts: [{ text: textToEmbed }] },
            }),
          },
        ).then((r) => r.json());
      });

      const responses = await Promise.all(requests);

      responses.forEach((res, idx) => {
        if (res.embedding && res.embedding.values) {
          vectorizedCorpus.push({
            ...batch[idx],
            embedding: res.embedding.values,
          });
        } else {
          console.warn(`Missing embedding for verse: ${batch[idx].id}`);
        }
      });

      // Artificial delay to prevent API rate limiting
      await new Promise((r) => setTimeout(r, 1000));
    } catch (err) {
      console.error("Error during embedding:", err);
      // Optionally save progress so far
      break;
    }
  }

  const outPath = path.join(
    __dirname,
    "src",
    "data",
    "gita_corpus_vectors.json",
  );
  fs.writeFileSync(outPath, JSON.stringify(vectorizedCorpus));
  console.log(`\nSuccessfully created semantic vector DB at ${outPath}`);
  console.log(
    `You can now import this JSON in your React frontend and perform cosine similarity against user queries!`,
  );
}

embedCorpus();
