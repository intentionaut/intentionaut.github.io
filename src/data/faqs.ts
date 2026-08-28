import { rates, gbp } from './rates';

export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
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
    answer:
      'Ask. If cost is the thing standing between you and booking, say so in your note. It counts if you are paying yourself rather than an employer, if your company is bootstrapped or unfunded, if the work is for a charity, nonprofit or the public sector, or if the full rate simply means you would not book at all. There is no proof to send, no essay to write and no negotiation. I will confirm an adjusted rate when we book. A few reduced slots each month keeps this honest; if the month is full, I will tell you and we will find another way.',
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
    answer:
      'Yes. Remote keynotes and workshops carry the same fee unless the format is much shorter. For in-person events, travel and accommodation are covered by the organizer.',
  },
  {
    question: 'Will you sign an NDA?',
    answer: 'Happily. Send yours, or use mine.',
  },
  {
    question: 'Can I hire you full-time?',
    answer:
      'For the right role, yes. Director level and above. The same clarity principle applies: shared understanding of the goal before we commit. If that sounds like your team, write me a note and tell me what you are trying to accomplish.',
  },
  {
    question: 'How does payment work?',
    answer:
      'Invoice and bank transfer, GBP unless we agree otherwise. Terms are on every proposal; nothing surprising arrives later.',
  },
  {
    question: 'Something else?',
    answer:
      'Ask me directly: hello@intentionaut.com.',
  },
];
