// mardown美化，配合vite-palugin-md 

// 1.添加自定义容器
// 2.添加行号
// 3.添加复制按钮
// 4.添加标题锚点
// 5.添加标题锚点导航
// 6.添加图片放大功能
// 7.添加代码高亮

import mdContainer from 'markdown-it-container';
import highlight from "highlight.js";

const markdownOption = {
  headEnabled: true,
  markdownItOptions: {
    html: true,
    linkify: true,
    typographer: true
  },
  markdownItSetup(md) {
    // 高亮代码
    md.set({
      highlight: function (str, lang) {
        if (lang && highlight.getLanguage(lang)) {
          try {
            return highlight.highlight(lang, str).value;
          } catch (__) { }
        }
        return ''; // 使用额外的默认转义
      }
    });
    // 自定义容器
    md.use(mdContainer, 'success', {
      render(tokens, idx) {
        const token = tokens[idx];
        const info = token.info.trim().slice('success'.length).trim();
        if (token.nesting === 1) {
          return `
            <div class="doc-success11 custom-block-success11 custom-block custom-block-title">
              <p class="title">${info || 'SUCCESS'}</p>`;
        } else {
          return `</div>`;
        }
      }
    });

    md.use(mdContainer, 'demo', {
      validate(params) {
        return params.trim().match(/^demo\s*(.*)$/);
      },
      render(tokens, idx) {
        const token = tokens[idx];
        const m = token.info.trim().match(/^demo\s*(.*)$/);
        if (token.nesting === 1) {
          const description = m && m.length > 1 ? m[1] : '';
          const content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : '';
          // 兼容script
          const script = content.replace(/<script>/g, '<script type="text/javascript">');
          return `<demo-block>
                    <div class="source" slot="source">${script}</div>
                    ${description ? `<div class="description" slot="description">${md.render(description)}</div>` : ''}
                    <div class="highlight" slot="highlight">`;
        }
        return '</div></demo-block>';
      }
    });
  }
};

export { markdownOption };
