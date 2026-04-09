export const SURFACES = [
  { 
    id: 'phone_notification', 
    label: 'Phone notification',
    modality: 'VISUAL',
    urgency: 'HIGH',
    description: 'Immediate, high-priority alerts delivered to the lock screen or status bar.',
    contentConstraints: { type: 'MEDIUM', maxLength: 60 }
  },
  { 
    id: 'gemini_app', 
    label: 'Gemini App',
    modality: 'MIXED',
    urgency: 'MEDIUM',
    description: 'Dedicated full-screen conversational interface for deep task execution.',
    contentConstraints: { type: 'LONG', maxLength: 120 }
  },
  { 
    id: 'gemini_web', 
    label: 'Gemini on the Web',
    modality: 'MIXED',
    urgency: 'LOW',
    description: 'Desktop browser interface suitable for research, long-form writing, and complex workflows.',
    contentConstraints: { type: 'LONG', maxLength: 200 }
  },
  { 
    id: 'android_auto', 
    label: 'Android Auto',
    modality: 'AUDIO',
    urgency: 'HIGH',
    description: 'Eyes-free, voice-first interface optimized for driving safety.',
    contentConstraints: { type: 'SHORT', maxLength: 40 }
  },
  { 
    id: 'smart_display', 
    label: 'Smart Display',
    modality: 'VISUAL',
    urgency: 'AMBIENT',
    description: 'Glanceable dashboard UI integrated into the home environment.',
    contentConstraints: { type: 'MEDIUM', maxLength: 80 }
  },
  { 
    id: 'smart_speaker', 
    label: 'Smart Speaker',
    modality: 'AUDIO',
    urgency: 'AMBIENT',
    description: 'Voice-only interaction for shared spaces.',
    contentConstraints: { type: 'MEDIUM', maxLength: 80 }
  },
  { 
    id: 'pixel_buds', 
    label: 'Pixel Buds',
    modality: 'AUDIO',
    urgency: 'HIGH',
    description: 'Personal, in-ear audio notifications and subtle voice assistance.',
    contentConstraints: { type: 'SHORT', maxLength: 50 }
  },
  { 
    id: 'watch_notification', 
    label: 'Watch notification',
    modality: 'VISUAL',
    urgency: 'HIGH',
    description: 'Ultra-glanceable, minimal alert on a circular wrist display.',
    contentConstraints: { type: 'SHORT', maxLength: 30 }
  },
  { 
    id: 'pixel_launcher_discover', 
    label: 'Pixel launcher Discover',
    modality: 'VISUAL',
    urgency: 'LOW',
    description: 'Personalized feed integration for passive discovery.',
    contentConstraints: { type: 'MEDIUM', maxLength: 70 }
  },
  { 
    id: 'chrome_side_panel', 
    label: 'Chrome side panel',
    modality: 'VISUAL',
    urgency: 'LOW',
    description: 'Companion interface providing context alongside active web browsing.',
    contentConstraints: { type: 'MEDIUM', maxLength: 90 }
  },
  { 
    id: 'chrome_new_tab', 
    label: 'Chrome new tab',
    modality: 'VISUAL',
    urgency: 'LOW',
    description: 'Proactive suggestions when opening a fresh browser context.',
    contentConstraints: { type: 'MEDIUM', maxLength: 70 }
  },
  { 
    id: 'chromebook_os', 
    label: 'Chromebook OS',
    modality: 'VISUAL',
    urgency: 'MEDIUM',
    description: 'System-level suggestions integrated into the desktop shelf or launcher.',
    contentConstraints: { type: 'MEDIUM', maxLength: 80 }
  },
  { 
    id: 'googletv_streamer', 
    label: 'Google TV streamer',
    modality: 'VISUAL',
    urgency: 'LOW',
    description: 'Living room media interface optimized for remote control navigation.',
    contentConstraints: { type: 'SHORT', maxLength: 50 }
  },
  { 
    id: 'gmail', 
    label: 'Gmail',
    modality: 'VISUAL',
    urgency: 'AMBIENT',
    description: 'Inline suggestions embedded directly within the email inbox flow.',
    contentConstraints: { type: 'MEDIUM', maxLength: 60 }
  },
  { 
    id: 'google_calendar', 
    label: 'Google Calendar',
    modality: 'VISUAL',
    urgency: 'AMBIENT',
    description: 'Time-based proactive suggestions integrated into the user schedule.',
    contentConstraints: { type: 'MEDIUM', maxLength: 60 }
  },
  { 
    id: 'google_chat', 
    label: 'Google Chat',
    modality: 'VISUAL',
    urgency: 'MEDIUM',
    description: 'Conversational suggestions injected into team or direct message feeds.',
    contentConstraints: { type: 'MEDIUM', maxLength: 60 }
  }
];

