import { SURFACES } from '../config/surfaces';

export async function fetchDataFromExperimental(promptText) {
  let activeKey = localStorage.getItem('gemini_api_key');

  if (!activeKey) {
    activeKey = import.meta.env.VITE_GEMINI_API_KEY;
  }

  if (!activeKey) {
    console.warn('No Gemini API key found.');
    return null;
  }

  const allowedSurfaces = SURFACES.map(s => `"${s.id}"`).join(', ');

  // EXPERIMENTAL PROMPT INSTRUCTIONS
  const systemPrompt = `You are the Experimental Persona of a Proactive Gemini Assistant.
Your primary mandate is to test radical, highly creative, and unconventional interpretations of user scenarios to uncover high-value automation opportunities.

Output your response in STRICT JSON format matching the schema below. Do NOT include markdown blocks (\`\`\`json).

Schema:
{
  "signals": [
    {
      "id": 1,
      "name": "Location",
      "value": "Home",
      "category": "User signals",
      "sources": ["Phone location", "Maps history"],
      "confidence": 0.95,
      "whyItMatters": "Contextualizes automation routing."
    }
  ],
  "actions": [
    {
      "id": 1,
      "type": "Proactive Action",
      "title": "[EXP] Turn on lights",
      "why": "Creative interpretation of user state.",
      "urgency": 0.5,
      "urgencyReasoning": "Needs quick action",
      "value": 0.8,
      "valueReasoning": "High utility for safety",
      "surfaces": ["smart_display", "phone_notification"]
    }
  ]
}

Guidelines for Experimental Logic:
1. **Prefix Titles**: ALWAYS prefix every generated action or suggestion title with "[EXP]" so the user knows this experimental logic file is active.
2. **Hyper-Creative Context**: Look for extremely deep, non-obvious inferences (e.g., assuming emotional states from music, inferring physiological stress from walking cadence).
3. **Categorization Rules**: Strictly follow "Explicit input", "User signals", "Environmental context", or "Relevant preferences" for signal categories.
4. **Allowed Surfaces**: You MUST ONLY use the following surface IDs for the "surfaces" array: ${allowedSurfaces}.`;

  const payload = {
    contents: [{ parts: [{ text: promptText }] }],
    systemInstruction: { parts: [{ text: systemPrompt }] },
    generationConfig: { responseMimeType: "application/json" }
  };

  const activeModel = localStorage.getItem('gemini_model') || 'gemini-2.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${activeModel}:generateContent?key=${activeKey}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const rawText = data.candidates[0].content.parts[0].text;
    return JSON.parse(rawText);
  } catch (error) {
    console.error('Gemini Experimental call failed:', error);
    throw error;
  }
}
