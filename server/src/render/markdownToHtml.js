'use strict';

// Deliberately minimal - handles the small subset of Markdown this project's
// issue drafts actually use (##/### headers, **bold**, *italic*, > quotes,
// [text](url) links, --- rules, blank-line-separated paragraphs). Not a
// general Markdown parser - if an issue draft starts using tables or nested
// lists, extend this rather than reaching for a dependency for one feature.
function inline(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
    .replace(/\*(.+?)\*/g, '<i>$1</i>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

function markdownToHtml(markdown) {
  const lines = markdown.split('\n');
  const html = [];
  let paragraph = [];
  const flush = () => {
    if (paragraph.length) {
      html.push(`<p>${inline(paragraph.join(' '))}</p>`);
      paragraph = [];
    }
  };
  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) { flush(); continue; }
    if (/^---+$/.test(line.trim())) { flush(); html.push('<hr>'); continue; }
    const h = /^(#{2,3})\s+(.*)/.exec(line);
    if (h) { flush(); const tag = h[1].length === 2 ? 'h2' : 'h3'; html.push(`<${tag}>${inline(h[2])}</${tag}>`); continue; }
    if (/^>\s?/.test(line)) { flush(); html.push(`<blockquote>${inline(line.replace(/^>\s?/, ''))}</blockquote>`); continue; }
    if (/^-\s+/.test(line)) { flush(); html.push(`<li>${inline(line.replace(/^-\s+/, ''))}</li>`); continue; }
    paragraph.push(line);
  }
  flush();
  // Wrap consecutive <li> in a single <ul> pass
  return html.join('\n').replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>\n${m}</ul>\n`);
}

module.exports = { markdownToHtml };
