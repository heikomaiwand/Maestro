// Live Gemini API client using native fetch to avoid NPM registry issues
import { SURFACES } from '../config/surfaces';

export async function fetchDataFromGemini(promptText) {
  let activeKey = localStorage.getItem('gemini_api_key');

  if (!activeKey) {
    activeKey = import.meta.env.VITE_GEMINI_API_KEY;
  }

  if (!activeKey) {
    console.warn('No Gemini API key found. Falling back to mock data.');
    return null;
  }

  const allowedSurfaces = SURFACES.map(s => `"${s.id}"`).join(', ');

  const systemPrompt = `You are the Brain of a Proactive Gemini Assistant. Your job is to act as a Context Engine and a Recommendation Engine for a given user scenario.

Output your response in STRICT JSON format matching the following schema. Do NOT include any markdown formatting (like \`\`\`json) in your response, just the raw JSON object.

Schema:
{
  "signals": [
    {
      "id": 1,
      "name": "Location",
      "value": "Home",
      "category": "User signals", // Allowed categories: "User signals", "Environmental context", "Relevant preferences"
      "sources": ["Phone location", "Maps history"],
      "confidence": 0.95,
      "whyItMatters": "Helps determine which physical devices are nearby for alerts."
    }
  ],
  "actions": [
    {
      "id": 1,
      "title": "Turn on lights",
      "why": "It is dark and you are arriving home.",
      "urgency": 0.5,
      "urgencyReasoning": "Needs quick action before user enters dark house",
      "value": 0.8,
      "valueReasoning": "High utility for safety",
      "surfaces": ["smart_display", "phone_notification"]
    }
  ]
}

Guidelines for Reasoning:
1. **Context Engine (Signals)**: List all potential signals and sources that might be relevant. Go WIDE. Consider physical devices, wearables, biometrics, search history, shared lists, home sensors, traffic, calendar.
2. **Recommendation Engine (Actions)**: Based on the signals, propose 2-3 high-value, realistic actions. Tie them to specific surfaces.
3. **Allowed Surfaces**: You MUST ONLY use the following surface IDs for the "surfaces" array: ${allowedSurfaces}.
4. Be imaginative with "Sources" (e.g., Fitbit, GoogleTV proximity, Buds ANC state, Nest Thermostat) to show an impressive vision.`;


  const payload = {
    contents: [{
      parts: [{ text: promptText }]
    }],
    systemInstruction: {
      parts: [{ text: systemPrompt }]
    },
    generationConfig: {
      responseMimeType: "application/json"
    }
  };

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${activeKey}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Gemini API Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    const text = result.candidates[0].content.parts[0].text;

    // Parse the JSON response
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error('Error calling Gemini API via fetch:', error);
    throw error;
  }
}
