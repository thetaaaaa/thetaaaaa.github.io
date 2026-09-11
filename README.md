# thetaaaaa.github.io

个人站点的源码。站点本身在 **<https://thetaaaaa.github.io>**。

写两类东西：在美国的生活观察，以及数据集建设和程序开发的规范方法与工具推荐——后者多半拿 CBDB（中国历代人物传记资料库）当例子。作者是南京大学图书情报学博士生，现为哈佛量化社会科学研究所（IQSS）fellow。[关于页](https://thetaaaaa.github.io/about/) · [RSS](https://thetaaaaa.github.io/feed.xml)

这个仓库放的是站点的源码和文章原文，不是通用模板；本身没有可复用的库或工具。零散的小工具和科研项目的源码在[我的其他仓库](https://github.com/thetaaaaa?tab=repositories)里。

## 技术说明

Jekyll 静态站点，用 GitHub Pages 原生构建，不需要配置 GitHub Actions。推送即发布，没有后端、没有第三方追踪脚本。文章是 `_posts/` 下的 Markdown 文件。

## 文档

详细使用说明在 `wiki/` 目录：

- [Home](wiki/Home.md)
- [快速上线](wiki/快速上线.md)
- [站点个性化配置](wiki/站点个性化配置.md)
- [日常写作指南](wiki/日常写作指南.md)
- [字体与本地预览](wiki/字体与本地预览.md)
- [注意事项](wiki/注意事项.md)

> 要发布到 GitHub Wiki，可直接复制 `wiki/` 目录中的页面内容。
