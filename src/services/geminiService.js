import { SURFACES } from '../config/interfaces';
import reasoningLogic from '../../reasoningLogic.md?raw';
import orchestrationLogic from '../../orchestrationLogic.md?raw';

export const geminiDebugCache = {
  loop1: { model: '', request: '', response: '' },
  loop2: {}
};

export async function fetchDataFromGemini(promptText) {
  let activeKey = localStorage.getItem('gemini_api_key');
  if (!activeKey) activeKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!activeKey) {
    console.warn('No Gemini API key found.');
    return null;
  }

  const allowedSurfaces = SURFACES.map(s => `"${s.id}"`).join(', ');

  const systemPrompt = `You are the primary Context & Recommendation Engine for an advanced proactive AI assistant.

CRITICAL RULES:
1. Try to always generate a list of exactly 3 to 5 distinct recommendations in the "actions" array. Only generate fewer if no other recommendations are appropriate.
2. The "why" field for recommendations MUST always be written in the 3rd person, describing the user objectively (e.g., "The user is approaching the dark house" or "Their daughter is locked out").
3. For the 'surfaces' array, you MUST ONLY use the exact string IDs provided in the schema definition below. DO NOT invent your own IDs (e.g., do not output "watch", you must output "watch_notification").
4. The prompt you receive is a PROTOTYPE SCENARIO describing a situation. Do NOT treat the prompt text as a literal direct user utterance or command unless it explicitly states "The user says/commands...".



Output your response in STRICT JSON format matching the schema below. Follow the inline comments exactly to locate the corresponding master guidelines.


Schema:
{
  "signals": [
    {
      "id": 1,
      "name": "Location",
      "value": "Home",
      "category": "User signals", // Refer strictly to the 'Categorization Framework' section below
      "sources": ["Phone location"], // Go wide and deep as instructed in the 'Source Creativity' section below
      "confidence": 0.95,
      "whyItMatters": "Brief explanation of utility."
    }
  ],
  "actions": [
    {
      "id": 1,
      "type": "Proactive Action", // Determine this strictly using the 'Determining Actions vs. Suggestions' section below
      "title": "Turn on foyer lights", // Short human readable title
      "why": "It is dark as the user appoaches the house", // Subtitle briefly describing of why in the 3rd person
      "urgency": 0.5, // Calculate this from 0.0 to 1.0 based on the 'Core Weighting Factors' section below
      "urgencyReasoning": "Why this specific timing score was chosen",
      "helpfulness": 0.8, // Calculate this from 0.0 to 1.0 based on the 'Core Weighting Factors' section below
      "helpfulnessReasoning": "Why this specific helpfulness score was chosen",
      "privacy": 0.3, // Calculate this from 0.0 to 1.0 based on the 'Core Weighting Factors' section below
      "privacyReasoning": "Why this specific privacy score was chosen",
      "estimatedUserValue": 0.9, // Calculate this from 0.0 to 1.0 based on the 'Core Weighting Factors' section below
      "estimatedUserValueReasoning": "Why this specific estimated user value score was chosen",
      "surfaces": ["smart_display"] // Select ONLY valid IDs from: ${allowedSurfaces}
    }
  ]
}

Use the master framework below as your absolute source of truth for all classifications:
---
${reasoningLogic}
---`;

  const payload = {
    contents: [{ parts: [{ text: promptText }] }],
    systemInstruction: { parts: [{ text: systemPrompt }] },
    generationConfig: { responseMimeType: "application/json" }
  };

  const activeModel = localStorage.getItem('gemini_model') || 'gemini-3.1-flash-preview';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${activeModel}:generateContent?key=${activeKey}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(`Gemini API error: ${response.status}`);
    const data = await response.json();
    
    geminiDebugCache.loop1 = {
      model: activeModel,
      systemInstruction: systemPrompt,
      requestPayload: promptText,
      response: data.candidates[0].content.parts[0].text
    };

    return JSON.parse(data.candidates[0].content.parts[0].text);
  } catch (error) {
    console.error('Gemini primary call failed:', error);
    throw error;
  }
}

export async function fetchOrchestrationFromGemini(actionData, scenarioContext = '') {
  let activeKey = localStorage.getItem('gemini_api_key');
  if (!activeKey) activeKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!activeKey) return null;

  // Dynamically pass the precise primitive content constraints from the interfaces configuration
  const primitiveConstraintsList = SURFACES.map(s => `
Interface ID: "${s.id}"
Label: "${s.label}"
Description: "${s.description}"
Modality: ${JSON.stringify(s.modality)}
Privacy Level: ${s.private ? 'Private / Personal' : 'Communal / Public'}
Timing Guidelines: "${s.timing}"
Required fields to generate based on exact character limits: ${JSON.stringify(s.primitiveContent)}`).join('\n');


  const systemPrompt = `You are the primary Orchestration Engine (Loop 2).

Use the master rules below to decide how to route and deliver the recommended proactive action across multiple ambient interfaces.

CRITICAL RULES FOR "HOW":
Instead of generating one generic message, you MUST generate a uniquely tailored JSON sub-object inside the "how" dictionary for EVERY interface ID you select in the "rankedSurfaces" array. The keys of this sub-object must match the elements from that interface's 'primitiveContent' rules below, strictly obeying the character count constraints.


Output your decision in STRICT JSON format matching precisely this schema:
{
  "when": {
    "decision": "Immediate | Scheduled | Contextual | Passive", // Based directly on 'Timing Strategy (The "When")' below
    "reasoning": "Why this timing is appropriate."
  },
  "where": {
    "reasoning": "Why these specific devices were selected based on 'Interface Selection (The "Where")' below.",
    "rankedSurfaces": ["phone_notification", "smart_display"] // MUST be an ordered array of valid interface IDs, ranked from most optimal to least optimal
  },
  "how": {
    "phone_notification": {
      "headline": "Foyer lights activated",
      "subheading": "Motion detected at the front approach",
      "action1": "Turn off"
    },
    "smart_display": {
      "headline": "Foyer lights activated",
      "subheading": "Motion detected at the front approach"
    }
  }
}

---
Master Primitive Content Definitions per Interface:
${primitiveConstraintsList}
---

Master Orchestration Logic:
---
${orchestrationLogic}
---`;

  const inputPayload = `User's Active Situational Context: "${scenarioContext}"

Recommendation Data to Route:
${JSON.stringify(actionData)}`;

  const payload = {
    contents: [{ parts: [{ text: inputPayload }] }],
    systemInstruction: { parts: [{ text: systemPrompt }] },
    generationConfig: { responseMimeType: "application/json" }
  };


  const activeModel = localStorage.getItem('gemini_model') || 'gemini-3.1-flash-preview';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${activeModel}:generateContent?key=${activeKey}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(`Orchestration Error: ${response.status}`);
    const result = await response.json();

    geminiDebugCache.loop2[actionData.id] = {
      model: activeModel,
      systemInstruction: systemPrompt,
      requestPayload: inputPayload,
      response: result.candidates[0].content.parts[0].text
    };

    return JSON.parse(result.candidates[0].content.parts[0].text);
  } catch (error) {
    console.error('Orchestration call failed:', error);
    throw error;
  }
}

export async function parseAddedSignalsFromText(text, currentSignals = []) {
  let activeKey = localStorage.getItem('gemini_api_key');
  if (!activeKey) activeKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!activeKey) return [];

  const validCategories = ["Explicit input", "User signals", "Environmental context", "Relevant preferences"];

  const systemPrompt = `You are a context processing agent. Extract signals from user's text into a fully structured JSON list.
  
  CRITICAL INSTRUCTIONS:
  1. Carefully read the user's text. Avoid adding duplicate information or directly contradictory elements relative to the existing signals list.
  2. For the "category", you MUST only map into one of these exact string literals: ${validCategories.map(c => `"${c}"`).join(', ')}. Do not create new headings.
  
  Schema:
  {
    "signals": [
      {
        "name": "Location",
        "value": "Home",
        "category": "User signals", // Refer strictly to the 'Categorization Framework' section below
        "sources": ["Phone location"], // Go wide and deep as instructed in the 'Source Creativity' section below. These should be potential ways to derive the signal as outlined
        "confidence": 0.95,
        "whyItMatters": "Explanation"
      }
    ]
  }`;

  const inputPayload = `Existing signals baseline:
  ${JSON.stringify(currentSignals, null, 2)}
  
  Added input text to evaluate:
  "${text}"`;

  const payload = {
    contents: [{ parts: [{ text: inputPayload }] }],
    systemInstruction: { parts: [{ text: systemPrompt }] },
    generationConfig: { responseMimeType: "application/json" }
  };

  const activeModel = localStorage.getItem('gemini_model') || 'gemini-3.1-flash-preview';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${activeModel}:generateContent?key=${activeKey}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    const data = await response.json();
    const parsed = JSON.parse(data.candidates[0].content.parts[0].text);
    return parsed.signals || [];
  } catch (error) {
    console.error('Failed to parse signals:', error);
    return [];
  }
}

export async function regenerateActionsFromSignals(signals) {
  let activeKey = localStorage.getItem('gemini_api_key');
  if (!activeKey) activeKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!activeKey) return null;

  const allowedSurfaces = SURFACES.map(s => `"${s.id}"`).join(', ');

  const systemPrompt = `You are the primary Context & Recommendation Engine. Given contextual signals, compute high-utility proactive recommendations matching the action schema below.
  
  CRITICAL RULES:
  1. Try to always generate a list of exactly 3 to 5 distinct recommendations in the "actions" array. Only generate fewer if no other recommendations are appropriate.
  2. The "why" field for recommendations MUST always be written in the 3rd person, describing the user objectively (e.g., "The user is approaching the dark house" or "Their daughter is locked out").

  Output in JSON matching this schema exactly:
  {
    "actions": [
      {
        "id": 1,
        "type": "Proactive Action", // Determine this strictly using the 'Determining Actions vs. Suggestions' section below
        "title": "Turn on foyer lights", // Short human readable title
        "why": "It is dark as the user appoaches the house", // Subtitle briefly describing of why in the 3rd person
        "urgency": 0.5, // Calculate this from 0.0 to 1.0 based on the 'Core Weighting Factors' section below
        "urgencyReasoning": "Why this specific timing score was chosen",
        "helpfulness": 0.8, // Calculate this from 0.0 to 1.0 based on the 'Core Weighting Factors' section below
        "helpfulnessReasoning": "Why this specific helpfulness score was chosen",
        "privacy": 0.3, // Calculate this from 0.0 to 1.0 based on the 'Core Weighting Factors' section below
        "privacyReasoning": "Why this specific privacy score was chosen",
        "estimatedUserValue": 0.9, // Calculate this from 0.0 to 1.0 based on the 'Core Weighting Factors' section below
        "estimatedUserValueReasoning": "Why this specific estimated user value score was chosen",
        "surfaces": ["smart_display"] // Select ONLY valid IDs from: ${allowedSurfaces}
      }
    ]
  }

  Use master reasoning guidelines:
  ---
  ${reasoningLogic}
  ---`;

  const payload = {
    contents: [{ parts: [{ text: JSON.stringify(signals) }] }],
    systemInstruction: { parts: [{ text: systemPrompt }] },
    generationConfig: { responseMimeType: "application/json" }
  };

  const activeModel = localStorage.getItem('gemini_model') || 'gemini-3.1-flash-preview';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${activeModel}:generateContent?key=${activeKey}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    const data = await response.json();
    return JSON.parse(data.candidates[0].content.parts[0].text);
  } catch (error) {
    console.error('Failed to regenerate options:', error);
    return null;
  }
}
