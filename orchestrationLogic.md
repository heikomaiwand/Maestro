# Orchestration Logic: The When, Where, & How Engine (Loop 2)

This document defines the heuristics for the second reasoning loop. Once a specific Proactive Action or Proactive Suggestion is selected, the orchestration layer determines the optimal manifestation strategy across Google's multi-device ecosystem.

---

## Core Orchestration Strategy (Actions vs. Suggestions)

Before determining timing or routing, you must adapt your approach based on whether the recommendation is an Action or a Suggestion:

1.  **Proactive Action**: The system has already completed a task automatically on the user's behalf (e.g., "Your oven was automatically turned off").
    *   *Orchestration Goal*: If valuable, provide a non-disruptive, glanceable notification to confirm the task was handled, alongside an optional context message. Do not demand an interaction unless a reversal is required.

2.  **Proactive Suggestion**: The system anticipates a high-value task but requires the user to yield, approve, or interact before anything happens.
    *   *Orchestration Goal*: Propose an interactive nudge delivered to the most appropriate interface to safely catch the user's attention and prompt an approval tap.

---

## 1. Timing Strategy (The "When")


The engine must decide whether to interrupt the user immediately or hold the recommendation for a better moment.

*   **Immediate**: Reserved for critical safety alerts, urgent ride arrivals, or time-sensitive communications. Manifests immediately via active push or audio alert.
*   **Contextual**: Held silently until the user interacts with a relevant interface or the context is optimal for the user to receive the message. (e.g., A grocery coupon is queued until the user opens Google Maps or walks into a store).
*   **Scheduled Summary**: Grouped into a daily recap (e.g., "Here's what happened while you were deep in focus mode").
*   **Passive**: Displayed silently in the background on ambient or hub screens (e.g., Gemini App or Smart Display home screen) so it is available whenever the user glances at the interface without actively catching their attention.


---

## 2. Interface Selection (The "Where")

Ranking the optimal target interface involves weighing the context against several critical dimensions:

### Core Evaluation Dimensions
*   **Privacy vs. Communal**: 
    *   *Content Sensitivity Check*: First, evaluate if the payload is inherently sensitive (medical, financial, or deeply personal).
    *   *Private Interfaces (`private: true`)*: Always safe for highly sensitive messages. Default choice for personal reminders.
    *   *Communal Interfaces (`private: false`)*: Prefer these for shared household utility (weather, family schedules, living room controls). 
    *   *Dynamic Override (Environmental Context)*: If the payload is somewhat sensitive but the AI observes that the user is definitively **home alone**, it is safe to utilize a communal interface (like a Smart Speaker chime) for higher immediate utility. Conversely, if non-household guests are detected, strictly route to private interfaces.
*   **Modality (Visual vs. Audio)**:
    *   *Visual Heavy*: Content requiring deep reading, maps, or detailed comparisons route to displays (Chrome, Smart Display).
    *   *Audio Friendly*: Simple binary choices or quick nudges route to speakers or buds.
*   **Interactivity Level**: Does this require complex text entry? If yes, avoid watch and smart speaker; prefer phone or desktop.
*   **Active User Attention (Focal Interface)**:
    *   *Focal Point Prioritization*: Evaluate if the environment clearly places the user's explicit visual or physical attention on a primary device (e.g., "Watching TV", "Typing on my computer").
    *   *Direct Routing*: Immediately rank the active device (Google TV, Chrome Desktop) higher in the hierarchy to reduce notification fragmentation. Avoid bypassing a screen the user is directly looking at.


---

## 3. Message Adaptation (The "How")

Instead of generating one generic message, you MUST generate a uniquely tailored payload for EVERY interface you selected in the "Where" section. Each payload must strictly adhere to the character limits and exact structure defined by that interface's 'primitiveContent' array.

For example, a notification on a watch requires extreme brevity, whereas a companion screen allows richer details. Always respect the specific format defined for each individual interface to maximize its unique strengths.


---

## 4. Multi-Device Orchestration Patterns

The most advanced orchestration involves coordinating across multiple interfaces simultaneously:
*   *The Gentle Nudge*: A subtle pulse on the Watch. If ignored for 5 minutes, escalate to a Phone notification.
*   *The Companion Screen*: Displaying a high-fidelity map on a Smart Display while simultaneously pinging the turn-by-turn audio to connected Pixel Buds.
