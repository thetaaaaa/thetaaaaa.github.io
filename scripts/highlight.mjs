// 用 Shiki 给构建好的 _site 里的代码块上色。
//
// kramdown 关掉了 Rouge（见 _config.yml），代码块只输出
// <pre><code class="language-xxx">转义后的源码</code></pre>。
// 这里在 jekyll build 之后逐个 HTML 文件替换成 Shiki 的结果。
//
// 亮色、暗色两套配色都写进 CSS 变量（--shiki-light / --shiki-dark），
// 由 main.css 跟随系统明暗切换。没写语言的代码块保持原样。

import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { createHighlighter } from "shiki";

const SITE = process.argv[2] ?? "_site";
const THEMES = { light: "github-light", dark: "github-dark" };
const BLOCK = /<pre([^>]*)><code class="language-([\w+#.-]+)">([\s\S]*?)<\/code><\/pre>/g;

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(path);
    else if (entry.name.endsWith(".html")) yield path;
  }
}

function unescape(html) {
  return html
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&amp;/g, "&");
}

const highlighter = await createHighlighter({ themes: Object.values(THEMES), langs: [] });

// 按需加载语言；Shiki 不认识的语言按纯文本处理
const known = new Map();
async function resolveLang(lang) {
  if (!known.has(lang)) {
    try {
      await highlighter.loadLanguage(lang);
      known.set(lang, lang);
    } catch {
      console.warn(`shiki: 不认识的语言 "${lang}"，按纯文本处理`);
      known.set(lang, "text");
    }
  }
  return known.get(lang);
}

let files = 0;
let blocks = 0;

for await (const file of htmlFiles(SITE)) {
  const html = await readFile(file, "utf8");
  const matches = [...html.matchAll(BLOCK)];
  if (matches.length === 0) continue;

  let out = "";
  let last = 0;
  for (const m of matches) {
    const code = unescape(m[3]).replace(/\n$/, "");
    const lang = await resolveLang(m[2].toLowerCase());
    out += html.slice(last, m.index);
    out += highlighter.codeToHtml(code, { lang, themes: THEMES, defaultColor: false });
    last = m.index + m[0].length;
  }
  out += html.slice(last);

  await writeFile(file, out);
  files += 1;
  blocks += matches.length;
}

console.log(`shiki: ${files} 个页面，${blocks} 个代码块`);
