# Reasoning Logic: The Context & Recommendation Engine (Loop 1)

This document defines the core decision-making heuristics for the first loop of our proactive anticipation engine. The goal of this loop is to take an unstructured user scenario, derive rich environmental signals, and compute high-value proactive actions or suggestions.

---

## 1. Signal Observation & Categorization

When evaluating a scenario, the engine must generate an exhaustive list of potential observations drawn from Google's ambient ecosystem.

### Categorization Framework
*   **Explicit Input**: Direct user interactions (e.g., speaking to Gemini, typing an address in Android Auto, searching on Google).
    *   *CRITICAL NEGATIVE CONSTRAINT*: Do NOT classify events as "Explicit Input" unless the scenario specifically mentions the user commanding a device. Narrations of natural events (e.g., "Groceries arrived" or "I open the door") are NOT explicit inputs. Do NOT use "User utterance" as a source unless the prompt says "The user says/asks...".
*   **User Signals**: State of the individual (e.g., biometrics, current activity, location, passive ambient audio, screen context).
*   **Environmental Context**: State of the surroundings (e.g., room temperature, proximity to specific home devices, noise levels, physical object detection via Smart Home Vision/Cameras).
*   **Relevant Preferences**: Long-term knowledge (e.g., routine timing, favorite playlists, dietary restrictions).

### Source Creativity
The engine should look beyond the obvious (GPS) and leverage deep integration:
*   *Examples*: Pixel Buds ANC status, Nest Doorbell/Camera Object Detection, Google TV proximity sensors, Nest Thermostat occupancy sensing, Fitbit REM cycles.


---

## 2. Determining Actions vs. Suggestions

Once signals are gathered, the engine evaluates which recommendations provide the most utility. Crucially, it must decide between taking a direct action versus offering a suggestion.

### Proactive Action
*   **Definition**: An automated state change executed directly on behalf of the user.
*   **When to trigger**:
    *   High confidence in user intent.
    *   Reversible or extremely low-risk execution (e.g., turning on lights in a dark hallway).
    *   Immediate safety/utility value (e.g., turning off an unattended oven).

### Proactive Suggestion
*   **Definition**: A notification or nudge offering a specific action that requires a tap to approve.
*   **When to trigger**:
    *   Moderate confidence in user intent.
    *   Actions with financial or permanent consequences (e.g., booking a ride, sending a message).
    *   Discovery scenarios (e.g., suggesting a recipe based on fridge inventory).

---

## 3. Core Weighting Factors

Every recommendation is scored across two primary axes:

1.  **Urgency (0.0 - 1.0)**: How time-sensitive is this intervention? (e.g., a boiling kettle is high urgency; a sleep reminder is low).
2.  **Value (0.0 - 1.0)**: How much physical or cognitive load, time, and/or money does this save for the user?

---

## 4. Critique & Steering Heuristics

To continuously refine these models, developers can provide structured critiques:
*   **Under-weighted Context**: Flagging when a critical signal was ignored.
*   **False Urgency**: Down-voting actions that interrupt the user unnecessarily.
