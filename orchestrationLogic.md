# Orchestration Logic: The When, Where, & How Engine (Loop 2)

This document defines the heuristics for the second reasoning loop. Once a specific Proactive Action or Proactive Suggestion is selected, the orchestration layer determines the optimal manifestation strategy across Google's multi-device ecosystem.

---

## 1. Timing Strategy (The "When")

The engine must decide whether to interrupt the user immediately or hold the recommendation for a better moment.

*   **Immediate Interruption**: Reserved for critical safety alerts, urgent ride arrivals, or time-sensitive communications. Manifests immediately via active push or audio alert.
*   **Contextual Cue**: Held silently until the user interacts with a relevant surface. (e.g., A grocery coupon is queued until the user opens Google Maps or walks into a store).
*   **Scheduled Summary**: Grouped into a daily recap (e.g., "Here's what happened while you were deep in focus mode").

---

## 2. Surface Selection (The "Where")

Ranking the optimal target surface involves weighing the context against several critical dimensions:

### Core Evaluation Dimensions
*   **Privacy vs. Communal**: 
    *   *Private*: Medical, financial, or highly personal suggestions route exclusively to personal devices (Phone, Pixel Buds, Watch).
    *   *Communal*: Weather updates, family reminders, or shared entertainment suggestions are safe for public surfaces (Nest Hub, Google TV).
*   **Modality (Visual vs. Audio)**:
    *   *Visual Heavy*: Content requiring deep reading, maps, or detailed comparisons route to displays (Chrome, Smart Display).
    *   *Audio Friendly*: Simple binary choices or quick nudges route to speakers or buds.
*   **Interactivity Level**: Does this require complex text entry? If yes, avoid watch and smart speaker; prefer phone or desktop.

---

## 3. Message Adaptation (The "How")

Once the surface is chosen, the actual content must be dynamically transformed to fit the medium.

*   **Glanceable Summary**: An easily understood header/title with an optional concise subtitle.
*   **Verbose Breakdown**: Features a Glanceable header/title, but additionally provides background reasoning, deep links, and/or rich media.
*   **Audio Handoff**: For Smart Speakers—keeps speech minimal but offers a visual hand-off ("I've sent the full list to your phone").

---

## 4. Multi-Device Orchestration Patterns

The most advanced orchestration involves coordinating across multiple devices simultaneously:
*   *The Gentle Nudge*: A subtle pulse on the Watch. If ignored for 5 minutes, escalate to a Phone notification.
*   *The Companion Screen*: Displaying a high-fidelity map on a Smart Display while simultaneously pinging the turn-by-turn audio to connected Pixel Buds.
