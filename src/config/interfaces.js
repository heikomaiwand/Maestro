export const SURFACES = [
  {
    id: 'phone_notification',
    label: 'Phone notification',
    description: 'Immediate, high-priority alerts delivered to the lock screen or status bar.',
    modality: ['textual'],
    surfaces: ['mobile'],
    timing: 'Excellent for "Immediate" if the recommendation is urgent, and "Contextual" based on the user\'s location (e.g., a coupon when walking into a store).',
    private: true,
    interactivity: 'Limited to quick tap actions or full deep-link handoff to the main application.',
    primitiveContent: [
      'Headline (max 60 characters)',
      'Subheading (max 120 characters)',
      'Action 1 (max 16 characters)',
      'Action 2 (max 16 characters)'
    ]
  },
  {
    id: 'gemini_app',
    label: 'Gemini App',
    description: 'Dedicated full-screen conversational interface for deep task execution on mobile and a hub to view digests and ongoing tasks.',
    modality: ['textual', 'audio'],
    surfaces: ['mobile'],
    timing: 'Best suited for "Passive" background delivery on the main hub canvas, and "Scheduled Summary" updates.',
    private: true,
    interactivity: 'Highly interactive. Optimized for long-form text, voice conversations, and multi-step task management.',
    primitiveContent: [
      'Headline (max 60 characters)',
      'Subheading (max 200 characters)'
    ]
  },
  {
    id: 'android_auto',
    label: 'Android Auto',
    description: 'Eyes-free, voice-first interface optimized for driving safety.',
    modality: ['textual'],
    surfaces: ['mobile'],
    timing: 'Highly appropriate for "Immediate" interruptions requiring eyes-free safety while driving and "Contextual" based on the user\'s location (e.g., a reminder when driving by a store)',
    private: true,
    interactivity: 'Low physical interactivity. Relies entirely on voice confirmations and simple steering wheel taps.',
    primitiveContent: [
      'Headline (max 40 characters)',
      'Subheading (max 120 characters)'
    ]
  },
  {
    id: 'smart_display',
    label: 'Smart Display',
    description: 'Glanceable dashboard UI integrated into the home environment, usually in a kitchen or bedroom.',
    modality: ['textual', 'tts', 'audio'],
    surfaces: ['smart display'],
    timing: 'Good for "Immediate" if the user is in the same room and their hands are full. Very strong for "Passive" visual background messages.',
    private: false,
    interactivity: 'Supports medium interaction through large tap targets and voice input.',
    primitiveContent: [
      'Headline (max 60 characters)',
      'Subheading (max 100 characters)',
      'Action 1 (max 16 characters)'
    ]
  },
  {
    id: 'smart_speaker',
    label: 'Smart Speaker',
    description: 'Voice-only interaction for shared spaces.',
    modality: ['tts', 'audio'],
    surfaces: ['smart speaker'],
    timing: 'Strong for "Immediate" voice cues or ambient notifications in shared household spaces.',
    private: false,
    interactivity: 'Relies purely on binary voice approvals (yes/no) or handoffs to visual screens.',
    primitiveContent: [
      'Text-to-speech (max 30 words)'
    ]
  },
  {
    id: 'pixel_buds',
    label: 'Pixel Buds',
    description: 'Personal, in-ear audio notifications and subtle voice assistance.',
    modality: ['tts', 'audio'],
    surfaces: ['earbuds'],
    timing: 'Highly appropriate for "Immediate", highly personal auditory interruptions, "Contextual" based on the context',
    private: true,
    interactivity: 'Minimal interactivity. Supports pure binary taps or voice responses.',
    primitiveContent: [
      'Text-to-speech (max 30 words)'
    ]
  },
  {
    id: 'watch_notification',
    label: 'Watch notification',
    description: 'Ultra-glanceable, minimal alert on a circular wrist display.',
    modality: ['textual'],
    surfaces: ['watch'],
    timing: 'Excellent for "Immediate" especially if the phone is in the pocket or they are otherwise occupied. high-priority nudges delivered silently via wrist vibration.',
    private: true,
    interactivity: 'Extremely low interaction. Ideal for single-tap approvals or glanceable status checks.',
    primitiveContent: [
      'Headline (max 60 characters)',
      'Subheading (max 100 characters)'
    ]
  },
  {
    id: 'pixel_launcher_discover',
    label: 'Pixel launcher Discover',
    description: 'Personalized feed integration for passive discovery.',
    modality: ['textual'],
    surfaces: ['mobile'],
    timing: 'Purely "Passive". Delivered silently directly into the discovery feed.',
    private: true,
    interactivity: 'Medium interaction. Requires a tap to open the full article or suggestion.',
    primitiveContent: [
      'Headline (max 60 characters)',
      'Subheading (max 120 characters)'
    ]
  },
  {
    id: 'chrome_side_panel',
    label: 'Chrome side panel',
    description: 'Companion interface providing context alongside active web browsing.',
    modality: ['textual'],
    surfaces: ['computer'],
    timing: 'Appropriate for "Contextual" cues related to the user\'s currently active browser tab.',
    private: true,
    interactivity: 'Highly interactive companion for copy-pasting and reading alongside main content.',
    primitiveContent: [
      'Headline (max 60 characters)',
      'Subheading (max 150 characters)'
    ]
  },
  {
    id: 'chrome_new_tab',
    label: 'Chrome new tab',
    description: 'Proactive suggestions when opening a fresh browser context.',
    modality: ['textual'],
    surfaces: ['computer'],
    timing: 'Delivered "Passive" whenever the user opens a fresh browser tab.',
    private: true,
    interactivity: 'Medium interaction. Designed for quick click-throughs to full web experiences.',
    primitiveContent: [
      'Headline (max 60 characters)',
      'Subheading (max 100 characters)'
    ]
  },
  {
    id: 'chromebook_os',
    label: 'Chromebook OS',
    description: 'System-level suggestions integrated into the desktop shelf or launcher.',
    modality: ['textual'],
    surfaces: ['computer'],
    timing: 'Appropriate for "Contextual" OS-level alerts or "Passive" shelf nudges.',
    private: true,
    interactivity: 'Highly interactive desktop window for complex task completion.',
    primitiveContent: [
      'Headline (max 60 characters)',
      'Subheading (max 120 characters)',
      'Action 1 (max 16 characters)'
    ]
  },
  {
    id: 'googletv_streamer',
    label: 'Smart TV',
    description: 'Large format display usually in the living room. Highly relevant if the user is currently watching something on it.',
    modality: ['textual', 'audio'],
    surfaces: ['tv'],
    timing: 'Appropriate for "Immediate" alerts when actively watching, "Contextual" living room cues, or "Passive" screensaver updates.',

    private: false,
    interactivity: 'Low interaction. Relies purely on D-pad navigation on a remote control.',
    primitiveContent: [
      'Headline (max 60 characters)',
      'Subheading (max 80 characters)'
    ]
  },
  {
    id: 'gmail',
    label: 'Gmail',
    description: 'Inline suggestions embedded directly within the email inbox flow.',
    modality: ['textual'],
    surfaces: ['computer'],
    timing: 'Delivered "Passive" inline as the user scans their active email threads.',
    private: true,
    interactivity: 'Medium interaction. Perfect for quick action chips inside the inbox flow.',
    primitiveContent: [
      'Headline (max 60 characters)',
      'Subheading (max 120 characters)',
      'Action 1 (max 16 characters)',
      'Action 2 (max 16 characters)'
    ]
  },
  {
    id: 'google_calendar',
    label: 'Google Calendar',
    description: 'Time-based proactive suggestions integrated into the user schedule.',
    modality: ['visual'],
    surfaces: ['computer'],
    timing: 'Highly "Contextual" to time-based routines or upcoming scheduling gaps or if "Passively" looking at the calendar.',
    private: true,
    interactivity: 'Medium interaction. Allows quick schedule adjustments or confirmations.',
    primitiveContent: [
      'Headline (max 60 characters)',
      'Subheading (max 100 characters)',
      'Start time',
      'End Time',
      'Action 1 (max 16 characters)',

    ]
  },
  {
    id: 'google_chat',
    label: 'Google Chat',
    description: 'Conversational suggestions injected into team or direct message feeds.',
    modality: ['textual'],
    surfaces: ['computer'],
    timing: 'Appropriate for "Contextual" nudges integrated directly into ongoing team message feeds.',
    private: true,
    interactivity: 'Highly interactive text communication channel.',
    primitiveContent: [
      'Headline (max 60 characters)',
      'Subheading (max 120 characters)',
      'Action 1 (max 16 characters)'
    ]
  }
];

