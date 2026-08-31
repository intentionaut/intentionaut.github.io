// Single source of truth for published rates. Change a number here and it
// updates everywhere it's quoted: /contact, /speaker, /forward-deployed and
// the FAQ page.
// Currency is GBP throughout, per the payment FAQ ("Invoice and bank
// transfer, GBP unless we agree otherwise").
export const rates = {
  strategySession: 400, // per 90-minute session
  fractional: 1200, // per day
  speaking: 1600, // per event, from
  // Forward Deployed Product Builder. Quoted NET: where an advisor or
  // recruiter introduces the work, their margin sits on top of this, not
  // inside it. See docs/forward-deployed-positioning.md.
  forwardDeployed: 1750, // per day
  scopingBlock: 6000, // five days, fixed, at the standard fractional rate
} as const;

/** Formats a GBP amount with thousands separators, e.g. gbp(1200) -> "£1,200" */
export function gbp(amount: number): string {
  return `£${amount.toLocaleString('en-GB')}`;
}
