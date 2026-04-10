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
      "category": "User signals", // Allowed categories: "Explicit input", "User signals", "Environmental context", "Relevant preferences"
      "sources": ["Phone location", "Maps history"],
      "confidence": 0.95,
      "whyItMatters": "Helps determine which physical devices are nearby for alerts."
    }
  ],
  "actions": [
    {
      "id": 1,
      "type": "Proactive Action", // MUST be either "Proactive Action" or "Proactive Suggestion"
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
1. **Context Engine (Signals)**: Categorize into "Explicit input", "User signals", "Environmental context", or "Relevant preferences".
   - CRITICAL RULE: Do NOT classify any observation as "Explicit input" unless the prompt explicitly states the user spoke, typed, or commanded an interface. Natural narrations (e.g., "Groceries arrived") are NOT explicit inputs. 
   - CRITICAL RULE: Do NOT hallucinate "User utterance" as a source unless the scenario actively mentions the user talking.

2. **Recommendation Engine (Actions)**: Propose 3-5 high-value recommendations. You MUST classify each as either a "Proactive Action" (direct execution) or a "Proactive Suggestion" (nudge offering help).
3. **Allowed Surfaces**: You MUST ONLY use the following surface IDs for the "surfaces" array: ${allowedSurfaces}.
4. Be imaginative with "Sources" to show an impressive vision.`;



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

  const activeModel = localStorage.getItem('gemini_model') || 'gemini-2.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${activeModel}:generateContent?key=${activeKey}`;


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

export async function fetchOrchestrationFromGemini(action) {
  let activeKey = localStorage.getItem('gemini_api_key') || import.meta.env.VITE_GEMINI_API_KEY;
  if (!activeKey) return null;

  const systemPrompt = `You are the Orchestration Engine (Loop 2) of a Proactive Gemini Assistant.
The Context Engine (Loop 1) has decided to propose the following Recommendation:

Title: "${action.title}"
Type: "${action.type}"
Why: "${action.why}"

Your job is to decide exactly WHEN, WHERE, and HOW to manifest this recommendation to the user across Google's ecosystem.

Output your response in STRICT JSON format matching the following schema. Do NOT include markdown formatting.

Schema:
{
  "when": {
    "decision": "Immediate Interruption", // Must be: "Immediate Interruption", "Contextual Cue", or "Scheduled Summary"
    "reasoning": "Explanation of timing based on urgency."
  },
  "where": {
    "surfaces": ["phone_notification", "watch_notification"], // Must use valid surface IDs
    "reasoning": "Explanation of surface choice (Privacy vs Communal, Audio vs Visual)."
  },
  "how": {
    "style": "Glanceable Summary", // Must be: "Glanceable Summary" or "Verbose Breakdown"
    "message": "The exact text/audio content adapted to fit the chosen surfaces perfectly."
  }
}`;

  const payload = {
    contents: [{ parts: [{ text: "Execute orchestration reasoning." }] }],
    systemInstruction: { parts: [{ text: systemPrompt }] }
  };

  const activeModel = localStorage.getItem('gemini_model') || 'gemini-2.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${activeModel}:generateContent?key=${activeKey}`;


  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(`Orchestration Error: ${response.status}`);
    const result = await response.json();
    return JSON.parse(result.candidates[0].content.parts[0].text);
  } catch (error) {
    console.error('Error calling Orchestration API:', error);
    return null;
  }
}

