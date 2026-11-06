/**
 * The three workshops. Each page under /workshops/ and the cards on the
 * overview read from here, so a title or promise is written once.
 * Copy is pending the voice pass (#160).
 */
import type { FaqPlacement } from './faqs';

export interface Workshop {
  slug: string;
  placement: FaqPlacement;
  eyebrow: string;
  title: string;
  lede: string;
  problems: string[];
  forWhom: string;
  decision: string;
  steps: string[];
  leaveWith: string;
  isnt: string;
  card: string;
  audience: string;
  metaTitle: string;
  metaDescription: string;
  faqSub: string;
}

export const workshops: Workshop[] = [
  {
    "slug": "ai-strategy",
    "placement": "workshops-ai-strategy",
    "eyebrow": "Workshop · AI strategy",
    "title": "Get your AI strategy under control",
    "lede": "From scattered AI work to a few bets that add up.",
    "problems": [
      "AI pilots everywhere, and nobody can say what they add up to.",
      "A board asking for the return on AI spend.",
      "The same problem solved twice, by two teams with two tools."
    ],
    "forWhom": "Product and technology leaders with AI work spreading across teams, and a board asking what it adds up to.",
    "decision": "Which AI bets your strategy backs, which ones stop, the one measure each kept bet answers to, and who owns the call.",
    "steps": [
      "Before the day, we list every piece of AI work in flight: pilots, tools, agents and side projects.",
      "The room sorts each one against what the strategy says matters now.",
      "We find the overlaps: the same problem being solved twice, or work nobody can tie to a goal.",
      "Your team chooses what to keep, merge or stop, and says why in one line.",
      "Each kept bet gets the one measure it answers to, and an owner.",
      "We close with a date to review the bets, and what would make you stop one."
    ],
    "leaveWith": "A one-page AI strategy, a list of kept and stopped bets with a measure each, and named owners.",
    "isnt": "It decides where AI belongs in your strategy, whichever tools you use.",
    "card": "Turn scattered AI work into a few bets your strategy backs, each with a measure and an owner.",
    "audience": "CPOs, CTOs and CDOs",
    "metaTitle": "AI strategy workshop for CPOs and CTOs | Saielle DaSilva",
    "metaDescription": "For CPOs, CTOs and CDOs with too many AI pilots: decide which AI bets to keep, merge or stop, each with one measure and an owner.",
    "faqSub": "What CPOs and CTOs ask before an AI strategy workshop."
  },
  {
    "slug": "ai-opportunity-mapping",
    "placement": "workshops-opportunity-mapping",
    "eyebrow": "Workshop · AI adoption",
    "title": "Opportunity mapping for AI adoption",
    "lede": "Agree where AI is worth adopting, and on what evidence.",
    "problems": [
      "Too many AI ideas, and no fair way to choose between them.",
      "Teams quoting different numbers for the same thing.",
      "Decisions about what to build that need a room of forty."
    ],
    "forWhom": "Product and engineering leaders where deciding what to build takes too many people, and the numbers tell different stories.",
    "decision": "Which opportunities to pursue first, what evidence supports each one, and who can decide without escalating.",
    "steps": [
      "We map one area of your product or operations, step by step, and mark where people lose time or make poor calls.",
      "The room names the AI opportunities in that map, without judging them yet.",
      "Mixed groups look at the evidence for each one, and find where the numbers disagree and why.",
      "We agree the definitions that matter, and sort every claim into measured, inferred, assumed or unknown.",
      "Your team ranks the opportunities by value and by how sure you are.",
      "We close with the first opportunity, an owner, and who can decide the next steps without escalating."
    ],
    "leaveWith": "An opportunity map, shared definitions, an evidence ledger, and the first opportunity with an owner.",
    "isnt": "It ends with one opportunity chosen on evidence.",
    "card": "Agree where AI is worth adopting, on evidence everyone trusts, and who decides.",
    "audience": "CPOs, CDOs and CTOs",
    "metaTitle": "AI opportunity mapping for CPOs and CDOs | Saielle DaSilva",
    "metaDescription": "For CPOs, CDOs and CTOs unsure where AI is worth adopting: map opportunities, agree the evidence when numbers disagree, and choose the first.",
    "faqSub": "What leaders ask before mapping AI opportunities."
  },
  {
    "slug": "product-maturity-model",
    "placement": "workshops-product-maturity",
    "eyebrow": "Workshop · Organisational development",
    "title": "Product maturity modelling",
    "lede": "Scale your product organisation without losing clarity.",
    "problems": [
      "What worked at 20 people stops working at 200.",
      "Product, design and engineering unsure who decides what.",
      "A product function that grew faster than its role was defined."
    ],
    "forWhom": "CEOs and CPOs scaling a product organisation.",
    "decision": "Where your product practice is today, where it needs to get to, and what product owns on the way.",
    "steps": [
      "Before the day, a short self-assessment from the leadership team, scored separately.",
      "We put the scores side by side, and talk about where people see things differently.",
      "The room agrees where product practice is today, and where it needs to be in a year.",
      "We map who owns which decisions now, and where roles overlap or leave gaps.",
      "Your team writes what product owns and what it doesn't, in plain words.",
      "We close with the next three development steps, each with an owner."
    ],
    "leaveWith": "A maturity assessment, a product charter, a responsibilities map, and the next three development steps.",
    "isnt": "This workshop is about how product works as you scale, with everyone in the roles they hold today.",
    "card": "For scaling product organisations: see where practice is today, where it needs to get to, and what product owns as you grow.",
    "audience": "CEOs and CPOs",
    "metaTitle": "Product maturity for CEOs and CPOs | Saielle DaSilva",
    "metaDescription": "Product maturity assessment for CEOs and CPOs scaling a product organisation. Agree what product owns as you grow, and the next three steps.",
    "faqSub": "What CEOs and CPOs ask before a maturity workshop."
  }
];

export function workshopBySlug(slug: string): Workshop {
  const w = workshops.find((x) => x.slug === slug);
  if (!w) throw new Error(`No workshop with slug "${slug}"`);
  return w;
}
