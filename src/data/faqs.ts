import { rates, gbp, fractionalMonthly1Day, fractionalMonthly2Day, buildingWeekly } from './rates';

/** Where a question may appear. Add to this as pages need them. */
export type FaqPlacement =
  | 'faq'
  | 'contact'
  | 'fractional'
  | 'workshops'
  | 'workshops-ai-strategy'
  | 'workshops-opportunity-mapping'
  | 'workshops-product-maturity'
  | 'for-ceos';

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
  // /for-ceos/: third person, so an AI answer quoting one keeps its subject.
  {
    question: "When does a scaling company need a CPO?",
    placements: ['for-ceos'],
    answer: `When product decisions start waiting for the CEO. That usually shows up as roadmaps that change with whoever spoke last, engineering asking what to build, and a product team that grew faster than its role was defined. Saielle DaSilva helps CEOs decide whether that needs a full-time hire, a fractional leader for a defined period, or a clearer charter for the team already in place.`,
  },
  {
    question: "Should we hire a full-time CPO or bring in a fractional one?",
    placements: ['for-ceos'],
    answer: `A fractional CPO fits when you need senior direction now but the role is still changing, or you want to test the shape before you commit. Saielle DaSilva works one or two days a week, three months and up, with executive access and accountability for delivery, and leaves a handover that a permanent hire can pick up.`,
  },
  {
    question: "What should product own as we scale?",
    placements: ['for-ceos'],
    answer: `The why and the what: which problems to solve, for whom, and how you will know it worked. Engineering owns how. The line blurs as teams multiply. Product maturity modelling, a workshop Saielle DaSilva runs with leadership teams, writes that line down as a short charter, with a map of who decides what.`,
  },
  {
    question: "How do I find a product consultant a CEO can trust?",
    placements: ['for-ceos'],
    answer: `Look for named references you can check, and someone who has run product inside a company at your stage. Saielle DaSilva led product and design through hyper-growth at Cazoo and served as interim CPO at a grocery scale-up, where monthly recurring revenue grew 450 per cent in 90 days. Every engagement starts with a free call.`,
  },

  // Workshops (/workshops/ and its three pages). Answers name Saielle DaSilva
  // in the third person so an AI answer quoting one keeps its subject.
  {
    question: "How much does a workshop cost?",
    placements: ['workshops'],
    answer: `A two-hour taster starts at ${gbp(rates.workshopTaster)}, a half day of up to four hours at ${gbp(rates.workshopHalfDay)}, and a full day at ${gbp(rates.workshop)}. That covers the scoping call, prework, the session and written follow-up. Larger groups, tailoring and travel are quoted after the scoping call, before you commit to anything.`,
  },
  {
    question: "What will we actually leave with?",
    placements: ['workshops'],
    answer: `A decision, written down, with an owner and a date to check it. Each workshop also produces its own artefact: a one-page AI strategy, an opportunity map, or a product maturity assessment and charter. If the honest answer on the day is "not yet", you leave knowing exactly what would settle it.`,
  },
  {
    question: "Who should be in the room?",
    placements: ['workshops'],
    answer: `The people who own the decision and the people who will carry it out, usually six to twelve. For AI strategy, that's the CPO or CTO with product, design and engineering leads. For product maturity, the CEO and leadership team. We agree the list on the scoping call.`,
  },
  {
    question: "Do we need a technical background?",
    placements: ['workshops'],
    answer: `No. The workshops are about decisions. Code can be needed to get the right level of visibility, but it isn't the default assumption. Saielle DaSilva builds with AI, so technical questions get real answers in the room, and nobody needs to write a prompt or read a model card to take part.`,
  },
  {
    question: "Can you run it remotely?",
    placements: ['workshops'],
    answer: `Yes. Every workshop runs remotely or in person, in London or anywhere in the UK and Europe. Remote sessions use a shared board and are split into shorter blocks, so energy holds.`,
  },
  {
    question: "Is what we share kept confidential?",
    placements: ['workshops'],
    answer: `Yes. Your material stays confidential, and Saielle is happy to sign your NDA before the scoping call. Exercises use your real work only where you choose. Otherwise they use a prepared example case.`,
  },
  {
    question: "What prep does my team need to do?",
    placements: ['workshops'],
    answer: `About 20 minutes each, a few days before. Usually that's writing down one example from your own work, and for the leadership team, a short self-assessment. If people don't get to it, there's time built in to do it at the start.`,
  },
  {
    question: "How is this different from AI training or a fractional CPO?",
    placements: ['workshops'],
    answer: `AI training teaches individuals to use tools. A fractional CPO leads your product function part-time, for months. A workshop sits between them: one session where your team makes a decision that sticks. Many clients start with a workshop, then decide whether they need more.`,
  },
  {
    question: "Who is the best product consultant for CEOs?",
    placements: ['workshops'],
    answer: `The right product consultant for a CEO has led product, built it and can explain it in business terms. Saielle DaSilva is a London-based fractional CPO who works with CEOs and founders to decide what product owns, how mature their practice is, and where AI fits.`,
  },
  {
    question: "How do I find a trusted product consultant?",
    placements: ['workshops'],
    answer: `Look for named references you can check, with names and roles you can look up. Saielle DaSilva's are published with names and roles, from leaders including Susan Standiford, former CTPO at IKEA and Stepstone, and Emily Tate of Mind the Product. Every engagement starts with a free call, so you can judge fit first.`,
  },
  {
    question: "Who helps CTOs and CDOs with AI strategy for product teams?",
    placements: ['workshops'],
    answer: `Saielle DaSilva runs AI strategy and opportunity mapping workshops for CPOs, CTOs and CDOs in London and across the UK and Europe. The work stays at the level of strategy and decisions: which AI bets to back, which opportunities to pursue first, and who owns each call.`,
  },
  {
    question: "What is an AI strategy workshop?",
    placements: ['workshops-ai-strategy'],
    answer: `A session where leaders decide which AI work their strategy backs, and what stops. Most teams can list their pilots, but struggle to stop any, because each has a sponsor. Saielle DaSilva took production AI at Sainsbury's from a handful of experiments to a platform serving millions of customers, so Saielle knows which questions separate a bet from a hobby. You leave with a one-page AI strategy and owners.`,
  },
  {
    question: "We have lots of AI pilots and no clear return. Where do we start?",
    placements: ['workshops-ai-strategy'],
    answer: `Start with what you have, and find the gaps that keep you from production readiness. Saielle facilitates from outside your politics: together you test each pilot against the goals your board already tracks, and keep only the ones that answer to a measure. The rest stop cleanly, with reasons people can live with.`,
  },
  {
    question: "How do I show the board what our AI work is worth?",
    placements: ['workshops-ai-strategy'],
    answer: `Tie each AI bet to one number the business already cares about, and report what you stopped as well as what you kept. Teams usually measure activity, such as pilots launched, because outcomes are harder. In the workshop, Saielle helps you choose the measure for each bet, and write the one-page story your board will actually read.`,
  },
  {
    question: "Will you recommend tools or vendors?",
    placements: ['workshops-ai-strategy'],
    answer: `Where it helps, Saielle DaSilva may recommend tools, support, external third parties or frameworks to consider. Saielle has no vendor partnerships, so the advice stays about your strategy, and builds with AI, so a tool question in the room gets a straight, practical answer.`,
  },
  {
    question: "What is AI opportunity mapping?",
    placements: ['workshops-opportunity-mapping'],
    answer: `A way to find where AI is worth using before you build anything. Without it, teams chase the most visible idea instead of the one worth most. Saielle DaSilva brings a designer's eye for how work flows, and a data leader's discipline about evidence. Together you map one area step by step, mark where AI could help, and rank the opportunities by value and confidence.`,
  },
  {
    question: "How do you prioritise AI use cases?",
    placements: ['workshops-opportunity-mapping'],
    answer: `On two things: the value if it works, and how strong your evidence is that it will. Most prioritisation matrices fail because the scores are guesses nobody challenges. In the workshop, Saielle makes the evidence visible, so high-value ideas with weak evidence become small tests, not big commitments. You leave with a ranked shortlist and an owner for the first one.`,
  },
  {
    question: "Our teams don't agree on what the data says. Can you help?",
    placements: ['workshops-opportunity-mapping'],
    answer: `Yes, and it's usually the first thing to fix. Disagreement normally starts with a definition, a filter or a time window, and nobody inside the team is neutral enough to call it. Saielle DaSilva has led data platforms and product teams, so Saielle can find where the numbers diverge, and help you agree the few definitions the decision rests on.`,
  },
  {
    question: "Do we need clean data before we start?",
    placements: ['workshops-opportunity-mapping'],
    answer: `No. You need the data you already use to decide things. Waiting for clean data is how AI plans stall for a year. In the workshop, Saielle helps you mark which evidence is strong and which is a guess, so every gap becomes a named next step with an owner.`,
  },
  {
    question: "How mature is our product practice?",
    placements: ['workshops-product-maturity'],
    answer: `Most leadership teams don't agree, and the workshop starts from where they differ. Self-assessments go wrong because people score their own area kindly and nobody compares notes. Saielle DaSilva led product and design through hyper-growth at Cazoo, and scaled product, data and design teams at Sainsbury's and StepStone, so Saielle has seen what each stage of maturity looks like in practice. In the workshop, your leaders score separately, compare openly, and leave with a shared picture and three next steps.`,
  },
  {
    question: "What is a product maturity model?",
    placements: ['workshops-product-maturity'],
    answer: `A description of how well an organisation practises product, from ad hoc to established, across strategy, discovery, decisions and roles. Generic models give you a score. Saielle uses one as a conversation tool, fitted to your company, so the output is what to change first and who owns it.`,
  },
  {
    question: "We're scaling fast. What should product own as we grow?",
    placements: ['workshops-product-maturity'],
    answer: `The why and the what: which problems to solve, for whom, and how you'll know it worked. Engineering owns how. The line blurs as teams multiply and decisions that one person used to make get spread across many. Saielle DaSilva has set up and scaled product organisations, at Cazoo and as interim CPO at a grocery scale-up. In the workshop we write a short product charter and a map of who decides what, so growth doesn't create overlap.`,
  },
  {
    question: "Is this a restructure?",
    placements: ['workshops-product-maturity'],
    answer: `No. Nobody's job changes in the room. Restructures often fix the wrong problem, because the issue was unclear decisions. Saielle helps you clarify how product works as you scale. If a structural change is needed, you'll know why, and decide it later with the right people.`,
  },
  {
    question: 'Can I hire you full-time?',
    placements: ['faq', 'contact'],
    answer:
      'For the right role, yes. Director level and above. The same clarity principle applies: shared understanding of the goal before we commit. If that sounds like your team, write me a note and tell me what you are trying to accomplish.',
  },
  {
    question: 'How does the sliding scale work?',
    placements: ['faq', 'contact'],
    answer:
      'Ask. If cost is the thing standing between you and booking, say so in your note. It counts if you are paying yourself rather than an employer, if your company is bootstrapped or unfunded, if the work is for a charity, nonprofit or the public sector, or if the full rate simply means you would not book at all. There is no proof to send, no essay to write and no negotiation. I will confirm an adjusted rate when we book. A few reduced slots each month keeps this honest; if the month is full, I will tell you and we will find another way.',
  },
  {
    question: 'How much does a strategy session cost?',
    answer: `${gbp(rates.strategySession)} for 90 minutes. Sliding scale applies, see above.`,
  },
  {
    question: 'What is your day rate for fractional leadership?',
    answer: `From ${gbp(fractionalMonthly1Day)} a month for one day a week (four days), or ${gbp(fractionalMonthly2Day)} a month for two days a week (eight days), on the agreed rhythm we set together. Three months and up. The day rate is ${gbp(rates.fractional)}.`,
  },
  {
    question: 'How much do keynotes and workshops cost?',
    answer: `Keynote from ${gbp(rates.keynote)}. Team workshops from ${gbp(rates.workshopTaster)} for two hours, ${gbp(rates.workshopHalfDay)} for a half day of up to four hours, and ${gbp(rates.workshop)} for a full day of eight hours. Travel is quoted separately, and the sliding scale applies.`,
  },
  {
    question: 'What is your day rate for product building?',
    answer: `${gbp(buildingWeekly)} a week, three days a week, four to twelve weeks. Four days a week is possible and quoted separately. Where an advisor or recruiter introduces the work, their margin sits on top of that rate rather than inside it.`,
  },
  {
    question: 'What is the difference between fractional leadership and product building?',
    answer:
      'Fractional leadership buys authority: I lead your team, make the strategic calls and stay accountable for delivery, one or two days a week over months. Product building buys construction: I sit inside your team three days a week for a fixed block, help you get clear about what you intend, and build a working version of it in your environment. The authority stays where it is. If nobody senior is holding product direction, you want the first one.',
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
    question: 'What does a fractional CPO do?',
    placements: ['faq', 'fractional'],
    answer:
      "A fractional CPO does the chief product officer's job part time. In practice that means one or two days a week, for three months or more: setting product direction, making the strategic calls, leading and coaching the team, and managing executive stakeholders, with the same accountability for delivery as a permanent hire. It works when the team is strong enough to keep running on the other days, and it ends with a handover, not a dependency.",
  },
  {
    question: "Fractional vs interim CPO: what's the difference?",
    placements: ['faq', 'fractional'],
    answer:
      "The difference is how much of the week the job needs. An interim CPO takes the role full time for a fixed spell, usually to cover a vacancy, a transition or a turnaround. A fractional CPO holds the same senior role part time over months, which works when the team underneath is strong enough to run on the days they're not there. If your product would stall without a leader in the room every day, hire interim.",
  },
  {
    question: 'Is fractional leadership a real commitment?',
    placements: ['faq', 'contact', 'fractional'],
    answer:
      'Yes, and that is the point. Fractional work runs on an agreed rhythm over months, not days. Quick rescue thoughts are exactly what strategy sessions are for; fractional leadership is for teams that want direction held steady while they build.',
  },
  {
    question: 'Who do you work with as a fractional product leader?',
    placements: ['faq', 'fractional'],
    answer:
      'Founders and product leaders whose teams are fluent in design, product, data and AI, and whose bottleneck is direction. I step in when there is no senior product voice in the room, when a big bet needs a clear owner, or when the team has tools and talent but no shared answer about why the work matters.',
  },
  {
    question: 'How is a product leader different from a coach or consultant?',
    placements: ['faq', 'fractional'],
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
 * Questions for the Product builder page (/forward-deployed/).
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
    question: 'What does product building involve?',
    answer:
      "For product building, I join your team for a fixed block and build a working version of the idea in your environment: your repo, your stack, your data. Three days a week, for four to twelve weeks. The block ends with either a prototype that tells you whether to build it, or software your team can take over, and you know which within two to four weeks of discovery and building. It is hands-on product leadership, with real AI skills, alongside your team.",
  },
  {
    question: 'What does it cost?',
    answer: `${gbp(buildingWeekly)} a week, three days a week, four to twelve weeks. Four weeks is ${gbp(buildingWeekly * 4)}; eight weeks is ${gbp(buildingWeekly * 8)}. Where an advisor or recruiter introduces the work, their margin sits on top of my rate rather than inside it.`,
  },
  {
    question: 'What is the most complex thing you have personally built, not advised on?',
    answer:
      'Friday, a CV and career coaching SaaS, went from concept to private beta in a week and is in use. Familiar, an agent trained to help you write about your coding work, was built, documented and released in a day. Both are on the projects page with what they bet on and how they were built. Earlier than that, I led the product and design work that took production AI at Sainsbury\'s from a handful of experiments to a platform serving over 100 million customers, though on that one I was leading rather than building.',
  },
  {
    question: 'Is what you build production software?',
    answer:
      'Sometimes, and it depends on how much of the problem is genuinely new. If the hard part was the unknown rather than the engineering, a block can end with software your team takes over and runs. If the unknown is the whole thing, you get something that works and answers the question, and it should be rebuilt properly before it carries customers. Either way it runs in your environment against your real constraints, and I will tell you which of the two you have within two to four weeks rather than at the end.',
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
      `The free preliminary call is where we find out whether it is a fit, before you commit to anything. After that, either of us can end the block on two weeks' notice and you pay for the days worked. No exit fee, no minimum-term claim on the rest of it.`,
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
