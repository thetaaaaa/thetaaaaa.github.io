## 关于

本仓库是个人站点的源码，站点本身在 **<https://www.litaolin.com>**。

作者是南京大学图书情报学博士生，现为哈佛量化社会科学研究所研究员（Fellow）。站点内容为作者在美国的生活观察，以及 CBDB（中国历代人物传记资料库）数据集建设和程序开发的规范方法与工具推荐。

## 技术说明

Jekyll 4 静态站点，由 GitHub Actions 构建、发布到 GitHub Pages。推送到 `main` 即发布，没有后端。站点走 Cloudflare，访问统计由 Cloudflare Web Analytics 在边缘注入，不使用 cookie，仓库里没有相关代码。文章是 `_posts/` 下的 Markdown 文件。

搭建步骤、配置字段、日常写作的格式约定、字体切换、本地预览和几条容量与隐私上的注意事项，都写在站内这篇文章里：[这个站点是怎么搭的](https://litaolin.com/2026/colophon/)。

## 正文样式与本地预览

正文使用 Tailwind Typography，保留站点字体和配色；表格边框等调整位于 `assets/css/main.css`。不启用 Tailwind Preflight。

需要 Node.js 22 和项目所需的 Ruby/Bundler：

```sh
npm ci
npm run build:css
bundle install
bundle exec jekyll serve
```

调整 `styles/typography.css` 或模板后重新运行 `npm run build:css`，也可另开终端运行 `npm run watch:css`。生成的 `assets/css/typography.css` 不入库，GitHub Actions 会在 Jekyll 构建前生成。
