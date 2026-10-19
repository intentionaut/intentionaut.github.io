// Single source of truth for published rates. Change a number here and it
// updates everywhere it's quoted: /contact, /speaker, /forward-deployed,
// /fractional, /capabilities, llms.txt and the FAQ page.
// Currency is GBP throughout, per the payment FAQ ("Invoice and bank
// transfer, GBP unless we agree otherwise").
//
// These are list prices and they are the only prices that exist in public.
// What may be given away against them — sliding scale, referral fees, the
// floor beneath which nothing is booked — is deliberately not in this repo,
// which is public. That lives in the private vault, not here.
export const rates = {
  strategySession: 500, // per 90-minute session
  fractional: 1500, // per day
  keynote: 3500, // per event, from
  workshop: 3000, // full-day team workshop, from
  workshopHalfDay: 1850, // half day, on request, from
  // Forward Deployed Product Builder. Quoted NET: where an advisor or
  // recruiter introduces the work, their margin sits on top of this, not
  // inside it. See docs/forward-deployed-positioning.md.
  forwardDeployed: 2250, // per day
  fdePilot: 4000, // fixed price for the two-day pilot that opens a block
} as const;

// Derived totals, so the day rates stay the one source.
export const fractionalMonthly1Day = rates.fractional * 4; // 1 day a week, 4 days
export const fractionalMonthly2Day = rates.fractional * 8; // 2 days a week, 8 days
export const buildingWeekly = rates.forwardDeployed * 3; // 3 days a week

/** Formats a GBP amount with thousands separators, e.g. gbp(1500) -> "£1,500" */
export function gbp(amount: number): string {
  return `£${amount.toLocaleString('en-GB')}`;
}
