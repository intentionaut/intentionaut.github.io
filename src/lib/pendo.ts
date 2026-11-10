/*
 * Pendo Track Events for the site's forms. The forms only know whether a send
 * worked once the Worker answers, and a click on the button cannot tell the
 * two apart, so the outcome is sent from the submit handlers.
 *
 * Never pass a name, an email address or a message here. Properties carry
 * attribution and placement only.
 */

type TrackValue = string | number | boolean | undefined;

interface PendoAgent {
  track: (event: string, properties?: Record<string, string | number | boolean>) => void;
}

// Pendo caps the whole properties payload at 512 bytes, so long values (a
// landing path, a campaign slug) are trimmed rather than risk the event.
const MAX_VALUE_LENGTH = 100;

export function trackEvent(event: string, properties: Record<string, TrackValue> = {}): void {
  try {
    const pendo = (window as Window & { pendo?: PendoAgent }).pendo;
    if (typeof pendo?.track !== 'function') return;
    const clean: Record<string, string | number | boolean> = {};
    for (const [key, value] of Object.entries(properties)) {
      if (value === undefined || value === '') continue;
      clean[key] = typeof value === 'string' ? value.slice(0, MAX_VALUE_LENGTH) : value;
    }
    pendo.track(event, clean);
  } catch {
    /* Analytics is optional. It must never break a form. */
  }
}
