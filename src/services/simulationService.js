import { fetchDataFromGemini } from './geminiService'


export const initialSignals = [
  { id: 1, name: 'Location', value: 'Home', category: 'User signals', sources: ['Phone location', 'Maps stored location'], confidence: 1.0, whyItMatters: 'Helps determine if you are available or in transit.' },
  { id: 2, name: 'Stress level', value: 'Low', category: 'User signals', sources: ['Fitbit', 'Activity history'], confidence: 0.58, whyItMatters: 'Impacts the tone and urgency of suggestions.' },
  { id: 3, name: 'People at home', value: '2 people', category: 'Environmental context', sources: ['Family location sharing', 'Presence sensing'], confidence: 0.76, whyItMatters: 'Determines if shared devices can be used for alerts.' },
  { id: 4, name: 'Appetite', value: 'Is hungry', category: 'Relevant preferences', sources: ['Maps history', 'Time of day'], confidence: 0.51, whyItMatters: 'Triggers food related recommendations.' },
  { id: 5, name: 'Media status', value: 'Currently watching TV', category: 'Environmental context', sources: ['GoogleTV Streamer'], confidence: 1.0, whyItMatters: 'Indicates the user state (relaxation vs active).' },
]


export const initialActions = [
  { id: 1, title: '{suggested action title}', why: 'Sentence describing the reasoning', urgency: 0.8, urgencyReasoning: 'Urgent task requiring attention', value: 0.9, valueReasoning: 'High value automation', surfaces: ['gmail', 'phone_notification'] },
  { id: 2, title: '{suggested action title}', why: 'Sentence describing the reasoning', urgency: 0.4, urgencyReasoning: 'Low urgency task', value: 0.7, valueReasoning: 'Medium value automation', surfaces: ['gmail'] },
  { id: 3, title: '{suggested action title}', why: 'Sentence describing the reasoning', urgency: 0.5, urgencyReasoning: 'Medium urgency task', value: 0.6, valueReasoning: 'Medium value automation', surfaces: ['gmail'] },
]

export const initialSelectedAction = initialActions[0]

export const generateDataFromPrompt = async (promptText) => {
  try {
    const liveData = await fetchDataFromGemini(promptText);

    if (liveData) {
      return liveData;
    }
  } catch (error) {
    console.error('Gemini API call failed:', error);
    throw error;
  }

  throw new Error("Gemini failed to return valid JSON.");
}




