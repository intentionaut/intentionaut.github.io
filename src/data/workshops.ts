/**
 * The workshops. Each page under /workshops/ and the cards on the
 * overview read from here, so a title or promise is written once.
 * Copy is pending the voice pass (#160).
 */
import type { FaqPlacement } from './faqs';

export interface Workshop {
  slug: string;
  /**
   * Set on a page that tests a second framing of another workshop (#hypothesis
   * Intentionaut-Workshop-Framing). It gets its own page but no card on /workshops/.
   */
  variantOf?: string;
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
  faqHeading: string;
}

export const workshops: Workshop[] = [
  {
    "slug": "ai-strategy",
    "placement": "workshops-ai-strategy",
    "eyebrow": "Workshop · AI product strategy",
    "title": "Get your AI product strategy under control",
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
    "leaveWith": "A one-page AI product strategy, a list of kept and stopped bets with a measure each, and named owners.",
    "isnt": "It decides where AI belongs in your strategy, whichever tools you use.",
    "card": "Turn scattered AI work into a few bets your strategy backs, each with a measure and an owner.",
    "audience": "CPOs, CTOs and CDOs",
    "metaTitle": "AI product strategy workshop for CPOs and CTOs | Saielle DaSilva",
    "metaDescription": "For CPOs, CTOs and CDOs with too many AI pilots: decide which AI bets to keep, merge or stop, each with one measure and an owner.",
    "faqSub": "What CPOs and CTOs ask before an AI product strategy workshop.",
    "faqHeading": "FAQ: AI product strategy workshop"
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
    "faqSub": "What leaders ask before mapping AI opportunities.",
    "faqHeading": "FAQ: AI opportunity mapping workshop"
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
    "faqSub": "What CEOs and CPOs ask before a maturity workshop.",
    "faqHeading": "FAQ: Product maturity modelling workshop"
  },
  {
    "slug": "data-informed-decisions",
    "placement": "workshops-data-decision",
    "eyebrow": "Workshop · Data-informed decisions",
    "title": "Data-informed decisions for product teams",
    "lede": "Take one decision your team is stuck on, and leave with it made.",
    "problems": [
      "The dashboard exists, but product, data and design each read it differently.",
      "Meetings start by arguing about what a number means.",
      "The call goes to whoever argues hardest, or it never gets made."
    ],
    "forWhom": "Product leadership teams with the data in place and a decision that still won't move.",
    "decision": "The decision you bring: one written recommendation, the numbers behind it agreed, and a named owner for what happens next.",
    "steps": [
      "Before the day, your sponsor picks one decision the numbers haven't settled, and your data lead shares how each number is defined today.",
      "Each leader names a recent call the numbers didn't settle, and the room works out what got in the way.",
      "The team writes one definition for each number the decision rests on, tests it, and signs it across product, data and design.",
      "We name who owns each number, and who makes the call.",
      "The team reads your real results against those definitions, and makes the case on one page for a sceptical executive to test.",
      "We close with one written recommendation: what it delays, and who acts in the next 90 days."
    ],
    "leaveWith": "A written recommendation with its trade-off and a 90-day owner, a signed definition for each number it rests on, and a named person who makes the call.",
    "isnt": "It works with the numbers you have today, so nothing needs cleaning up first.",
    "card": "Take one stalled product decision, agree the numbers behind it, and leave with it made.",
    "audience": "product, data and design leaders",
    "metaTitle": "Data-informed decision workshop for product leaders | Saielle DaSilva",
    "metaDescription": "For product, data and design leaders: agree what your numbers mean, and leave with one stalled decision made and owned.",
    "faqSub": "What product leaders ask before a data-informed decision workshop.",
    "faqHeading": "FAQ: data-informed decision workshop"
  },
  {
    "slug": "data-culture",
    "placement": "workshops-data-culture",
    "variantOf": "data-informed-decisions",
    "eyebrow": "Workshop · Data culture",
    "title": "Data culture for product and data leaders",
    "lede": "Get product, data and design reading the same numbers the same way.",
    "problems": [
      "The dashboard exists, but product, data and design each read it differently.",
      "Meetings start by arguing about what a number means.",
      "The call goes to whoever argues hardest, or it never gets made."
    ],
    "forWhom": "Leadership teams whose product, data and design functions read the same numbers differently.",
    "decision": "What each number your teams argue about means, who owns it, and one live decision made on those numbers.",
    "steps": [
      "Before the day, your sponsor picks one decision the numbers haven't settled, and your data lead shares how each number is defined today.",
      "Each leader names a recent call the numbers didn't settle, and the room works out what got in the way.",
      "The team writes one definition for each number the decision rests on, tests it, and signs it across product, data and design.",
      "We name who owns each number, and who makes the call.",
      "The team reads your real results against those definitions, and makes the case on one page for a sceptical executive to test.",
      "We close with one written recommendation: what it delays, and who acts in the next 90 days."
    ],
    "leaveWith": "A signed definition for each number your teams argue about, an owner for each, and one live decision made on them.",
    "isnt": "It works with the numbers you have today, so nothing needs cleaning up first.",
    "card": "Agree what your numbers mean and who owns them, then make one live decision on them.",
    "audience": "product, data and design leaders",
    "metaTitle": "Data culture workshop for product and data leaders | Saielle DaSilva",
    "metaDescription": "A data culture workshop for product, data and design leaders: agree what the numbers mean, who owns them, and make one live decision on them.",
    "faqSub": "What leaders ask before a data culture workshop.",
    "faqHeading": "FAQ: data culture workshop"
  },
];

export function workshopBySlug(slug: string): Workshop {
  const w = workshops.find((x) => x.slug === slug);
  if (!w) throw new Error(`No workshop with slug "${slug}"`);
  return w;
}
