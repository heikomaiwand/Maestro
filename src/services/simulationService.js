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
    console.error('Gemini API call failed, falling back to mock data:', error);
  }

  // Fallback mock logic for testing without API key
  const text = promptText.toLowerCase()
  const isRain = text.includes('rain')
  const isDriving = text.includes('drive') || text.includes('driving')
  const isHome = text.includes('home')
  const isNYC = text.includes('nyc') || text.includes('new york')

  let newSignals = []
  let newActions = []

  if (isNYC) {
    newSignals = [
      { id: 1, name: 'Interest', value: 'Planning trip to NYC', category: 'User signals', sources: ['Search History'], confidence: 0.9, whyItMatters: 'Triggers travel itinerary planning.' },
      { id: 2, name: 'Calendar', value: 'Free next weekend', category: 'User signals', sources: ['Google Calendar'], confidence: 0.95, whyItMatters: 'Confirms availability for the trip.' },
      { id: 3, name: 'Budget', value: 'Moderate', category: 'Relevant preferences', sources: ['Past hotel bookings'], confidence: 0.7, whyItMatters: 'Filters hotel and activity options.' },
    ]
    newActions = [
      { id: 1, title: 'Help plan trip to NYC', why: 'You have free time next weekend and were searching for hotels.', urgency: 0.45, urgencyReasoning: 'Planning ahead avoids last minute stress', value: 0.7, valueReasoning: 'Saves time researching hotels', surfaces: ['gmail', 'phone_notification'] },
      { id: 2, title: 'Look up things to do in NYC', why: 'You are interested in NYC but haven\'t booked activities yet.', urgency: 0.3, urgencyReasoning: 'No rush, trip is a week away', value: 0.5, valueReasoning: 'Fun activities planning', surfaces: ['gmail', 'smart_display'] },
    ]
  } else if (isRain || isDriving) {
    newSignals = [
      { id: 1, name: 'Location', value: isDriving ? 'In Car' : 'Office', category: 'User signals', sources: ['Phone GPS'], confidence: 0.95, whyItMatters: 'Contextualizes commuting delays.' },
      { id: 2, name: 'Weather', value: isRain ? 'Raining' : 'Clear', category: 'Environmental context', sources: ['Weather API'], confidence: 1.0, whyItMatters: 'Triggers weather-specific route adjustments.' },
      { id: 3, name: 'Activity', value: isDriving ? 'Driving' : 'Stationary', category: 'User signals', sources: ['Accelerometer', 'Maps'], confidence: 0.88, whyItMatters: 'Helps determine safety and delivery times.' },
    ]
    newActions = [
      { id: 1, title: 'Suggest Alternate Route', why: 'Raining and traffic suggests a better route might exist.', urgency: 0.8, urgencyReasoning: 'Rerouting saves time in active commute', value: 0.9, valueReasoning: 'Direct time savings', surfaces: ['android_auto', 'phone_notification'] },
      { id: 2, title: 'Order Dinner Early', why: 'You will be home late due to traffic and rain.', urgency: 0.4, urgencyReasoning: 'Order before delivery rush', value: 0.7, valueReasoning: 'Ensures food arrives when you get home', surfaces: ['gmail', 'smart_display'] },
    ]
  } else {
    newSignals = [
      { id: 1, name: 'Location', value: isHome ? 'At Home' : 'Office', category: 'User signals', sources: ['Phone GPS'], confidence: 0.9, whyItMatters: 'Determines the baseline context.' },
      { id: 2, name: 'Calendar', value: 'No upcoming meetings', category: 'User signals', sources: ['Google Calendar'], confidence: 0.95, whyItMatters: 'Indicates a clear window for relaxation.' },
    ]
    newActions = [
      { id: 1, title: 'Relaxing evening', why: 'No urgent tasks detected.', urgency: 0.2, urgencyReasoning: 'No pressing events', value: 0.5, valueReasoning: 'Personal wellness', surfaces: ['smart_display'] },
    ]
  }

  return { signals: newSignals, actions: newActions }
}


