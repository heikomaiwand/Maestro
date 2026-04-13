import { SURFACES } from '../config/surfaces';
import reasoningLogic from '../../reasoningLogic.md?raw';

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

  const systemPrompt = `You are the Experimental Persona of a Proactive Gemini Assistant. Your job is to act as a Context Engine and a Recommendation Engine for a given user scenario.

Output your response in STRICT JSON format matching the schema below. Do NOT include markdown blocks (\`\`\`json).

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
      "title": "[EXP] Turn on lights",
      "why": "It is dark and you are arriving home.",
      "urgency": 0.5,
      "urgencyReasoning": "Needs quick action before user enters dark house",
      "value": 0.8,
      "valueReasoning": "High utility for safety",
      "surfaces": ["smart_display", "phone_notification"]
    }
  ]
}

CRITICAL GUIDELINES:
1. You MUST prefix every generated title with "[EXP]".
2. Allowed surfaces MUST be strictly chosen from: ${allowedSurfaces}.

Below is your master Reasoning Logic framework. Use these rules as your absolute source of truth for evaluating the scenario:

---
${reasoningLogic}
---`;

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

import orchestrationLogic from '../../orchestrationLogic.md?raw';

export async function fetchOrchestrationFromExperimental(actionData) {
  let activeKey = localStorage.getItem('gemini_api_key');
  if (!activeKey) activeKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!activeKey) return null;

  const systemPrompt = `You are the Experimental Orchestration Engine (Loop 2). 
Your mandate is to decide how to route and deliver the recommended proactive action across multiple ambient surfaces using radical, experimental heuristics.

Use the following master orchestration rules as your absolute source of truth for making these decisions:
---
${orchestrationLogic}
---

Output your decision in STRICT JSON format matching exactly this schema:
{
  "when": {
    "decision": "Immediate | Scheduled | Ambient",
    "reasoning": "Why this interruption timing is appropriate."
  },
  "where": {
    "reasoning": "Why these specific devices were selected for delivery."
  },
  "how": {
    "style": "Glanceable Summary | Verbose Breakdown",
    "message": "The adapted message payload."
  }
}`;

  const payload = {
    contents: [{ parts: [{ text: JSON.stringify(actionData) }] }],
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
    if (!response.ok) throw new Error(`Experimental Orchestration Error: ${response.status}`);
    const result = await response.json();
    return JSON.parse(result.candidates[0].content.parts[0].text);
  } catch (error) {
    console.error('Experimental Orchestration failed:', error);
    throw error;
  }
}

