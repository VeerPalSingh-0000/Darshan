exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const apiKey = process.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "API key not configured on server",
        }),
      };
    }

    const { contents, systemInstruction } = JSON.parse(event.body);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction,
          contents,
        }),
      },
    );

    const data = await response.json();

    if (data.error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: data.error.message }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Gemini Proxy Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
