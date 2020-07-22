// 覆盖默认的 fence 渲染策略

module.exports = (md) => {
  md.renderer.rules.fence = (tokens, idx) => {
    const token = tokens[idx];
    return `<div class="fli-code"><pre v-pre class="language-${token.info}"><code>${md.utils.escapeHtml(token.content)}</code></pre></div>`;
  };
  md.renderer.rules.hr = (tokens, idx) => {
    return `<div class="customize-hr"></div>`;
  };
  md.renderer.rules.link_open = (tokens, idx) => {
    return `<a href="${tokens[idx].attrs[0][1]}" target="_blank">`;
  };
  md.renderer.rules.blockquote_open = () => {
    return `<blockquote><span class="blockquote-start">❝</span>`;
  };
  md.renderer.rules.blockquote_close = () => {
    return `<span class="blockquote-end">❞</span></blockquote>`;
  };
  md.renderer.rules.heading_open = (tokens, idx) => {
    const h_start = tokens[idx].tag.trim();
    return `<${h_start} id="heading-${idx}" class="heading-title" anchor="${h_start}"><span class="prefix"></span><span class="content">`;
  };
  md.renderer.rules.heading_close = (tokens, idx) => {
    const h_end = tokens[idx].tag.trim();
    return `</span><span class="suffix"></span></${h_end}>`;
  };
};
