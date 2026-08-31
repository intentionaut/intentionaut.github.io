import { rates, gbp } from './rates';

/** Where a question may appear. Add to this as pages need them. */
export type FaqPlacement = 'faq' | 'contact';

export interface Faq {
  question: string;
  answer: string;
  /**
   * Which pages it may appear on. Omitted means the FAQ page only.
   *
   * /contact used to hand-write its own shortlist as nested <details> markup,
   * which drifted from the wording here. Now it filters this list, so there is
   * one answer to every question and adding a page needs one word.
   */
  placements?: FaqPlacement[];
}

export const faqs: Faq[] = [
  {
    question: 'Can I hire you full-time?',
    placements: ['faq', 'contact'],
    answer:
      'For the right role, yes. Director level and above. The same clarity principle applies: shared understanding of the goal before we commit. If that sounds like your team, write me a note and tell me what you are trying to accomplish.',
  },
  {
    question: 'How much does a strategy session cost?',
    answer: `${gbp(rates.strategySession)} for 90 minutes. Sliding scale applies, see above.`,
  },
  {
    question: 'What is your day rate for fractional leadership?',
    answer: `${gbp(rates.fractional)} a day, on the agreed rhythm we set together.`,
  },
  {
    question: 'How much do keynotes and workshops cost?',
    answer: `From ${gbp(rates.speaking)} for an event. Private workshops are quoted by scope and travel, sliding scale applies.`,
  },
  {
    question: 'How does the sliding scale work?',
    placements: ['faq', 'contact'],
    answer:
      'Ask. If cost is the thing standing between you and booking, say so in your note. It counts if you are paying yourself rather than an employer, if your company is bootstrapped or unfunded, if the work is for a charity, nonprofit or the public sector, or if the full rate simply means you would not book at all. There is no proof to send, no essay to write and no negotiation. I will confirm an adjusted rate when we book. A few reduced slots each month keeps this honest; if the month is full, I will tell you and we will find another way.',
  },
  {
    question: 'What is your day rate for forward deployed product building?',
    answer: `${gbp(rates.forwardDeployed)} a day, three days a week, four weeks minimum. It starts with a five-day scoping block at ${gbp(rates.scopingBlock)}, which is the fractional rate rather than this one. Where an advisor or recruiter introduces the work, their margin sits on top of that rate rather than inside it.`,
  },
  {
    question: 'What is the difference between fractional leadership and forward deployed product building?',
    answer:
      'Fractional leadership buys authority: I lead your team, make the strategic calls and stay accountable for delivery, one or two days a week over months. Forward deployed product building buys construction: I sit inside your team three days a week for a fixed block, help you get clear about what you intend, and build a working version of it in your environment. The authority stays where it is. If nobody senior is holding product direction, you want the first one.',
  },
  {
    question: 'What happens after I get in touch?',
    answer:
      'I reply to every serious note, usually within a couple of working days. We book a short call to scope things. If it looks like a fit, you get a brief written proposal: what we would do, when, and what it costs.',
  },
  {
    question: 'What happens in a strategy session?',
    answer:
      'Beforehand you answer a few questions, so the clock starts on substance rather than introductions. Then ninety minutes working your actual problem. Afterwards you get written notes: decisions made, next steps, who owns what.',
  },
  {
    question: 'Is fractional leadership a real commitment?',
    placements: ['faq', 'contact'],
    answer:
      'Yes, and that is the point. Fractional work runs on an agreed rhythm over months, not days. Quick rescue thoughts are exactly what strategy sessions are for; fractional leadership is for teams that want direction held steady while they build.',
  },
  {
    question: 'Who do you work with as a fractional product leader?',
    answer:
      'Founders and product leaders whose teams are fluent in design, product, data and AI, and whose bottleneck is direction. I step in when there is no senior product voice in the room, when a big bet needs a clear owner, or when the team has tools and talent but no shared answer about why the work matters.',
  },
  {
    question: 'How is a product leader different from a coach or consultant?',
    answer:
      'A coach develops the people and a consultant hands over a report. A product leader owns the outcome and stays accountable for it. I work directly on your direction, your decisions and your shipped results, and I help the team build the muscle to keep doing it when I leave.',
  },
  {
    question: 'Do you speak virtually?',
    placements: ['faq', 'contact'],
    answer:
      'Yes. Remote keynotes and workshops carry the same fee unless the format is much shorter. For in-person events, travel and accommodation are covered by the organiser.',
  },
  {
    question: 'Will you sign an NDA?',
    placements: ['faq', 'contact'],
    answer: 'Happily. Send yours, or use mine.',
  },
  {
    question: 'Can I hire you full-time?',
    placements: ['faq', 'contact'],
    answer:
      'For the right role, yes. Director level and above. The same clarity principle applies: shared understanding of the goal before we commit. If that sounds like your team, write me a note and tell me what you are trying to accomplish.',
  },
  {
    question: 'How does payment work?',
    placements: ['faq', 'contact'],
    answer:
      'Invoice and bank transfer, GBP unless we agree otherwise. Terms are on every proposal; nothing surprising arrives later.',
  },
  {
    question: 'Something else?',
    answer:
      'Ask me directly: hello@intentionaut.com.',
  },
];

/**
 * Questions for the Forward Deployed Product Builder page.
 *
 * Drawn from buyer-side "questions to ask before you hire" guides rather than
 * from seller FAQ pages, which mostly define services instead of answering
 * objections (see docs/forward-deployed-positioning.md). The uncomfortable
 * ones are deliberately here rather than left out: cost, availability,
 * failure modes, and what this does not do.
 *
 * Rendered on /forward-deployed/ with FAQPage schema. The two questions that
 * belong to the site-wide price list (day rate, and the difference from
 * fractional) also appear in `faqs` above, so /faq/ stays the canonical
 * answer for anyone comparing engagements.
 */
export const forwardDeployedFaqs: Faq[] = [
  {
    question: 'What does it cost?',
    answer: `${gbp(rates.forwardDeployed)} a day, three days a week, four weeks minimum. Before that, a five-day scoping block at ${gbp(rates.scopingBlock)}, which is my standard fractional rate rather than this one. Four weeks at three days a week is £21,000; eight weeks is £42,000, plus the scoping either way. Where an advisor or recruiter introduces the work, their margin sits on top of my rate rather than inside it.`,
  },
  {
    question: 'What is the most complex thing you have personally built, not advised on?',
    answer:
      'Friday, a coaching product for early-career film and TV crew, went from concept to private beta in a week and is in use. Familiar, a set of writing tools, was built, documented and released in a day. Both are on the projects page with what they bet on and how they were built. Earlier than that, I led the product and design work that took production AI at Sainsbury\'s from a handful of experiments to a platform serving over 100 million customers, though on that one I was leading rather than building.',
  },
  {
    question: 'Is what you build production software?',
    answer:
      'Sometimes, and it depends on how much of the problem is genuinely new. If the hard part was the unknown rather than the engineering, a block can end with software your team takes over and runs. If the unknown is the whole thing, you get something that works and answers the question, and it should be rebuilt properly before it carries customers. Either way it runs in your environment against your real constraints, and I will tell you which of the two you have by about week two rather than at the end.',
  },
  {
    question: 'What did you build that still works without you?',
    answer:
      'Ask me again in a year with a client name attached, and in the meantime here is how the engagement is built to survive me. The prototype lives in your repository from the first week, not mine. Your team works alongside it rather than receiving it at the end. The written record covers why things are shaped the way they are, not only what was done, because that is the part that decides whether the next person can change it safely. And I do not sell a support tail, which means the handover has to be real rather than a number you can call.',
  },
  {
    question: 'How many clients are you working with at once, and do any of them compete with me?',
    answer:
      'One, occasionally two. Three days a week embedded does not divide further without the work getting worse, and I would rather turn something down than tell you I am there when I am not. If a live engagement competes with yours I will say so before we scope, not after.',
  },
  {
    question: 'What if it is not working?',
    answer:
      'The five-day scoping block exists so you can find that out for six thousand pounds instead of forty-two thousand. After that, either of us can end the block on two weeks\' notice and you pay for the days worked. No exit fee, no minimum-term claim on the rest of it.',
  },
  {
    question: 'What conditions make this engagement fail?',
    answer:
      'Three, and I have seen all of them. One: nobody on your side can make a decision inside a week, so the prototype waits on a committee and the block runs out. Two: the problem is a disagreement between people rather than an unknown about the product, in which case a working prototype just gives everyone something new to argue about. Three: I cannot get access to a real environment and real data, and you end up paying embedded rates for a sandbox demo you could have got cheaper.',
  },
  {
    question: 'Will my product team feel replaced?',
    answer:
      'It is a fair worry and worth naming early. I am not there to take product decisions off anyone, and the engagement is deliberately built so I do not have the authority to. Your team keeps deciding what the product should be. I build the thing that tells you whether the decision was right. In practice the people who find it uncomfortable are usually those who were promised build capacity and never got it, which is a conversation worth having before I arrive rather than after.',
  },
  {
    question: 'Who owns the code?',
    answer:
      'You do, on payment, including everything built during the engagement. I keep the general tooling and scaffolding I bring with me and had before we started, and you get a licence to keep using it as part of what I built. That carve-out is in the contract in plain words, not buried.',
  },
  {
    question: 'Does this put us inside IR35?',
    answer:
      `That depends partly on how big you are. If you are a small company under the Companies Act tests, the off-payroll rules do not apply to you, and the status determination is mine to make rather than yours. Above that threshold it is yours. Either way, ask your adviser early, because the answer can change the shape we agree.

What I can tell you is how I work: my own method, my own equipment, other clients running alongside, and a scope written around what gets built. The day rate is how we price the work. It is not what you are buying.`,
  },
  {
    question: 'How is this different from your fractional leadership?',
    answer:
      'Fractional buys authority. I lead your team, make the strategic calls and stay accountable for delivery, one or two days a week over months. This buys construction. I sit inside the team for a fixed block, help you get clear on what you intend, and build a working version of it, while the authority stays exactly where it already is. If nobody senior is holding product direction, you want fractional and I will tell you so.',
  },
  {
    question: 'Can you do four days a week?',
    answer:
      'Yes, at the same daily rate. Three is the default for two reasons. It keeps a second client running, which matters for how the engagement is treated for tax on your side as well as mine. And the day away is where the thinking happens; four-day weeks have produced more code and worse decisions every time I have tried them.',
  },
];

/**
 * The questions to show on a page, in file order.
 *
 * Mirrors testimonialsFor() in testimonials.ts: order is deliberate rather
 * than sorted, so reordering is a cut and paste.
 */
export function faqsFor(placement: FaqPlacement): Faq[] {
  return faqs.filter((f) => (f.placements ?? ['faq']).includes(placement));
}
