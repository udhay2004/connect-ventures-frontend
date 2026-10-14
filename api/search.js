// api/search.js
// Vercel serverless function — handles POST /api/search using Claude's
// built-in web_search tool (no Gemini key needed).
//
// Why Claude instead of Gemini:
// You already need an ANTHROPIC_API_KEY for the chatbot service — this
// reuses that same key type so you don't have to buy a separate Gemini
// key just for marketplace search. You can point this at the same key
// value as the chatbot, or use a separate key if you want billing/usage
// tracked separately between the two services.
//
// Setup required in Vercel:
//   Project → Settings → Environment Variables → add ANTHROPIC_API_KEY
//   Redeploy after adding it.

const SYSTEM_PROMPT = `You are an expert business acquisition research assistant.
The user wants to find real, active businesses for sale from around the web based on their query.

Use web search to find real, actual, current business-for-sale listings on sites like BizBuySell, BusinessesForSale.com, Acquire.com, Flippa, BusinessBroker.net, DealStream, MergerNetwork, Axial, or similar global marketplaces.

After searching, respond with ONLY a raw JSON array of up to 12 real listings you found. No other text, no markdown code fences, no preamble or explanation — just the JSON array itself.

Each object in the array must have exactly these fields:
{
  "title": "exact listing title or a descriptive name if not clear",
  "country": "country",
  "industry": "industry category (e.g., Manufacturing, Food & Beverages, Retail, Healthcare, Technology, etc.)",
  "dealType": "acquisition|merger|franchise|investment",
  "askingPrice": "price as string e.g. $2.5M or USD 500,000 or On request",
  "revenue": "annual revenue or Undisclosed",
  "summary": "2-3 sentence description of the business",
  "highlights": ["point 1", "point 2", "point 3"],
  "yearEstablished": "year or empty string",
  "employees": "employee count or range",
  "sourceUrl": "direct URL to the listing",
  "sourceName": "BizBuySell / Acquire.com / etc"
}

Only include REAL listings you actually found via web search. If you find fewer than 12 real results, return only what you found. If you find none, return an empty array [].`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('[api/search] ANTHROPIC_API_KEY is not set in the Vercel project env vars.');
    return res.status(500).json({ error: 'Search is temporarily unavailable.' });
  }

  const { query } = req.body || {};
  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    const apiRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-5',
        max_tokens: 2000,
        system: SYSTEM_PROMPT,
        messages: [
          { role: 'user', content: `Search query: "${query}"` },
        ],
        tools: [
          { type: 'web_search_20250305', name: 'web_search' },
        ],
      }),
    });

    if (!apiRes.ok) {
      const errBody = await apiRes.text();
      console.error('[api/search] Anthropic API error:', apiRes.status, errBody);
      return res.status(500).json({ error: 'Search provider error' });
    }

    const data = await apiRes.json();

    // Concatenate all text blocks in the response (the model may interleave
    // text with tool_use/tool_result/citation blocks around its searches).
    let text = (data.content || [])
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('')
      .trim();

    if (text.includes('```')) {
      const match = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (match) text = match[1].trim();
    }

    if (!text) return res.status(200).json([]);

    try {
      const parsed = JSON.parse(text);
      return res.status(200).json(parsed);
    } catch (parseErr) {
      console.error('[api/search] Failed to parse Claude JSON output:', text);
      return res.status(500).json({ error: 'Failed to parse search results' });
    }
  } catch (err) {
    console.error('[api/search] Request failed:', err);
    return res.status(500).json({ error: err.message || 'An error occurred during search' });
  }
}
