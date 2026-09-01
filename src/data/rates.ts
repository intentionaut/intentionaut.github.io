// Single source of truth for published rates. Change a number here and it
// updates everywhere it's quoted: /contact, /speaker, /forward-deployed and
// the FAQ page.
// Currency is GBP throughout, per the payment FAQ ("Invoice and bank
// transfer, GBP unless we agree otherwise").
//
// These are list prices and they are the only prices that exist in public.
// What may be given away against them — sliding scale, referral fees, the
// floor beneath which nothing is booked — is deliberately not in this repo,
// which is public. That lives in the vault:
// 06-Resources/Intentionaut/Discount_and_Referral_Rule.md
export const rates = {
  strategySession: 500, // per 90-minute session
  fractional: 1500, // per day
  speaking: 2000, // per event, from
  // Forward Deployed Product Builder. Quoted NET: where an advisor or
  // recruiter introduces the work, their margin sits on top of this, not
  // inside it. See docs/forward-deployed-positioning.md.
  forwardDeployed: 2250, // per day
} as const;

/** Formats a GBP amount with thousands separators, e.g. gbp(1500) -> "£1,500" */
export function gbp(amount: number): string {
  return `£${amount.toLocaleString('en-GB')}`;
}
