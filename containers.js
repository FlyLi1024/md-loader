const mdContainer = require('markdown-it-container');
const emoji = require('markdown-it-emoji');

module.exports = (md) => {
  md.use(mdContainer, 'demo', {
    validate(params) {
      return params.trim().match(/^demo\s*(.*)$/);
    },
    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
      if (tokens[idx].nesting === 1) {
        const description = m && m.length > 1 ? m[1] : '';
        const content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : '';
        return `<doc-block>
        ${description ? `<div>${md.render(description)}</div>` : ''}
        <!--kad-demo: ${content}:kad-demo-->
        `;
      }
      return '</doc-block>';
    }
  })
    .use(...createCustomBlock('tip', 'tip'))
    .use(...createCustomBlock('success', 'success'))
    .use(...createCustomBlock('info', 'info'))
    .use(...createCustomBlock('warning', 'warning'))
    .use(...createCustomBlock('danger', 'danger'))
    .use(emoji);
};

function createCustomBlock(klass, defaultTitle) {
  return [
    mdContainer,
    klass,
    {
      render(tokens, idx) {
        const token = tokens[idx];
        const info = token.info.trim().slice(klass.length).trim();
        if (token.nesting === 1) {
          return `<div class="custom-block custom-block-${klass}"><div class="custom-block-title">${info || defaultTitle}</div><div class="custom-block-content">`;
        } else {
          return `</div></div>`;
        }
      }
    }
  ];
}
