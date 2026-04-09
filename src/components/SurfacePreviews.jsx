import React from 'react';

// High-Fidelity Canvas Previews
import { GmailPreview } from './surfaces/GmailPreview';
import { PhoneNotificationPreview } from './surfaces/PhoneNotificationPreview';
import { AndroidAutoPreview } from './surfaces/AndroidAutoPreview';
import { WatchPreview } from './surfaces/WatchPreview';

// Standardized Low-Fidelity Generic Previews
import { GeminiAppPreview } from './surfaces/GeminiAppPreview';
import { SmartDisplayPreview } from './surfaces/SmartDisplayPreview';
import { SmartSpeakerPreview } from './surfaces/SmartSpeakerPreview';
import { PixelBudsPreview } from './surfaces/PixelBudsPreview';
import { PixelLauncherDiscoverPreview } from './surfaces/PixelLauncherDiscoverPreview';
import { ChromeSidePanelPreview } from './surfaces/ChromeSidePanelPreview';
import { ChromeNewTabPreview } from './surfaces/ChromeNewTabPreview';
import { ChromebookOsPreview } from './surfaces/ChromebookOsPreview';
import { GoogletvStreamerPreview } from './surfaces/GoogletvStreamerPreview';
import { GoogleCalendarPreview } from './surfaces/GoogleCalendarPreview';
import { GoogleChatPreview } from './surfaces/GoogleChatPreview';
import { GenericSurfacePlaceholder } from './surfaces/shared';

export const getSurfacePreviewComponent = (surfaceId, action) => {
  switch (surfaceId) {
    case 'phone_notification': return <PhoneNotificationPreview action={action} />;
    case 'gemini_app': return <GeminiAppPreview action={action} />;
    case 'gmail': return <GmailPreview action={action} />;
    case 'android_auto': return <AndroidAutoPreview action={action} />;
    case 'smart_display': return <SmartDisplayPreview action={action} />;
    case 'smart_speaker': return <SmartSpeakerPreview action={action} />;
    case 'pixel_buds': return <PixelBudsPreview action={action} />;
    case 'watch_notification': return <WatchPreview action={action} />;
    case 'pixel_launcher_discover': return <PixelLauncherDiscoverPreview action={action} />;
    case 'chrome_side_panel': return <ChromeSidePanelPreview action={action} />;
    case 'chrome_new_tab': return <ChromeNewTabPreview action={action} />;
    case 'chromebook_os': return <ChromebookOsPreview action={action} />;
    case 'googletv_streamer': return <GoogletvStreamerPreview action={action} />;
    case 'google_calendar': return <GoogleCalendarPreview action={action} />;
    case 'google_chat': return <GoogleChatPreview action={action} />;
    default: return <GenericSurfacePlaceholder label="Unknown surface" />;
  }
};
