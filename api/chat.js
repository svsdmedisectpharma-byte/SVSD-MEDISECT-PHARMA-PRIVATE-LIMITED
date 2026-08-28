import medicinesData from '../src/data/medicines.json' with { type: 'json' };

const SYSTEM_PROMPT = `You are the official AI Customer Support & Pharma Information Assistant for Medisect Pharma Pvt. Ltd.
Registered Address: Saibaba Complex, Goregaon East, Mumbai, Maharashtra – 400063
Hotline & WhatsApp Desk: +91 75874 32458
Email: svsdmedisectpharma@gmail.com

Role & Boundaries:
- You act as a knowledgeable, polite, and compliant customer support assistant for Medisect Pharma.
- Answer user questions strictly about the medicines, formulations, generic compositions, dosages, packaging, and therapeutic indications listed in our portfolio.
- Medisect Pharma Formulations Catalog:
${medicinesData.map((m) => `  - ${m.name} (${m.generic_name}): Category: ${m.category}, Composition: ${m.composition}, Packaging: ${m.packaging}, Indications: ${m.indications.join(', ')}`).join('\n')}

Mandatory Guidelines:
1. Always advise users that information is for trade and educational reference, and prescription medicines must be taken strictly as prescribed by a registered healthcare professional.
2. Do NOT attempt to diagnose medical conditions or issue individual medical prescriptions.
3. If asked about unlisted medicines or unrelated topics, politely state that you can only provide information about Medisect Pharma's portfolio and direct them to contact our trade desk at +91 75874 32458 or svsdmedisectpharma@gmail.com.
4. Keep responses well-structured, professional, concise, and formatted nicely with markdown bullet points where appropriate.`;

export async function handleOpenRouterChat(req, res) {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    return res.end(
      JSON.stringify({
        error: 'OPENROUTER_API_KEY is not configured in environment variables.',
      })
    );
  }

  let bodyData = '';
  req.on('data', (chunk) => (bodyData += chunk));
  req.on('end', async () => {
    try {
      const parsed = JSON.parse(bodyData || '{}');
      const userMessages = parsed.messages || [];

      const fullMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...userMessages,
      ];

      const openRouterResponse = await fetch(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
            'HTTP-Referer': 'https://medisect-pharma.pages.dev',
            'X-Title': 'Medisect Pharma AI Assistant',
          },
          body: JSON.stringify({
            model: 'openai/gpt-oss-120b',
            stream: true,
            messages: fullMessages,
          }),
        }
      );

      if (!openRouterResponse.ok) {
        const errorText = await openRouterResponse.text();
        res.statusCode = openRouterResponse.status;
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({ error: errorText }));
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      // Node.js web ReadableStream pipe to HTTP response
      const reader = openRouterResponse.body.getReader();
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        res.write(value);
      }
      res.end();
    } catch (err) {
      console.error('OpenRouter Proxy Error:', err);
      if (!res.headersSent) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: err.message }));
      }
    }
  });
}
