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
import { SmartTvPreview } from './surfaces/SmartTvPreview';
import { GoogleCalendarPreview } from './surfaces/GoogleCalendarPreview';
import { GoogleChatPreview } from './surfaces/GoogleChatPreview';
import { GenericSurfacePlaceholder } from './surfaces/shared';

export const getSurfacePreviewComponent = (surfaceId, action, cache = {}) => {
  const orchData = action && cache ? cache[action.id] : null;
  
  const activeRanked = orchData && orchData.where && Array.isArray(orchData.where.rankedSurfaces) 
    ? orchData.where.rankedSurfaces 
    : (action && action.surfaces ? action.surfaces : []);

  const isActive = activeRanked.includes(surfaceId);

  switch (surfaceId) {
    case 'phone_notification': return <PhoneNotificationPreview action={action} orchData={orchData} showPrimitive={isActive} />;
    case 'gemini_app': return <GeminiAppPreview action={action} orchData={orchData} showPrimitive={isActive} />;
    case 'gmail': return <GmailPreview action={action} orchData={orchData} showPrimitive={isActive} />;
    case 'android_auto': return <AndroidAutoPreview action={action} orchData={orchData} showPrimitive={isActive} />;
    case 'smart_display': return <SmartDisplayPreview action={action} orchData={orchData} showPrimitive={isActive} />;
    case 'smart_speaker': return <SmartSpeakerPreview action={action} orchData={orchData} showPrimitive={isActive} />;
    case 'pixel_buds': return <PixelBudsPreview action={action} orchData={orchData} showPrimitive={isActive} />;
    case 'watch_notification': return <WatchPreview action={action} orchData={orchData} showPrimitive={isActive} />;
    case 'pixel_launcher_discover': return <PixelLauncherDiscoverPreview action={action} orchData={orchData} showPrimitive={isActive} />;
    case 'chrome_side_panel': return <ChromeSidePanelPreview action={action} orchData={orchData} showPrimitive={isActive} />;
    case 'chrome_new_tab': return <ChromeNewTabPreview action={action} orchData={orchData} showPrimitive={isActive} />;
    case 'chromebook_os': return <ChromebookOsPreview action={action} orchData={orchData} showPrimitive={isActive} />;
    case 'googletv_streamer': return <SmartTvPreview action={action} orchData={orchData} showPrimitive={isActive} />;
    case 'google_calendar': return <GoogleCalendarPreview action={action} orchData={orchData} showPrimitive={isActive} />;
    case 'google_chat': return <GoogleChatPreview action={action} orchData={orchData} showPrimitive={isActive} />;
    default: return <GenericSurfacePlaceholder label="Unknown surface" />;
  }
};

