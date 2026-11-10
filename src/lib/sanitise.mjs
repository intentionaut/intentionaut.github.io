import sanitizeHtml from 'sanitize-html';

// Allowlist for HTML that comes from outside this repo (beehiiv, changelogs).
// Built from what published posts actually use; anything else is dropped.
const OPTIONS = {
  allowedTags: [
    'a', 'aside', 'b', 'blockquote', 'br', 'code', 'div', 'em', 'figcaption', 'figure',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'i', 'img', 'li', 'ol', 'p', 'pre', 's',
    'span', 'strong', 'sub', 'sup', 'table', 'tbody', 'td', 'th', 'thead', 'tr', 'u', 'ul',
  ],
  allowedAttributes: {
    '*': ['aria-label', 'class', 'id'],
    a: ['data-skip-tracking', 'href', 'rel', 'target'],
    img: ['alt', 'decoding', 'height', 'loading', 'src', 'width'],
    ol: ['start'],
    td: ['colspan', 'rowspan'],
    th: ['colspan', 'rowspan'],
  },
  allowedSchemes: ['http', 'https', 'mailto'],
  allowProtocolRelative: false,
};

export const sanitise = (html) => sanitizeHtml(html, OPTIONS);
