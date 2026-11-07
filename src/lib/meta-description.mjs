// Search results cut descriptions near 160 characters. Beehiiv subtitles are often
// the post's opening lines, so end at the last full sentence that fits; else at a word.
export function trimDescription(text, max = 160) {
  const s = String(text ?? '').replace(/\s+/g, ' ').trim();
  if (s.length <= max) return s;
  const head = s.slice(0, max);
  const end = Math.max(head.lastIndexOf('. '), head.lastIndexOf('! '), head.lastIndexOf('? '));
  if (end >= 60) return head.slice(0, end + 1);
  return head.slice(0, head.lastIndexOf(' ', max - 1)).replace(/[,;:]$/, '') + '…';
}
