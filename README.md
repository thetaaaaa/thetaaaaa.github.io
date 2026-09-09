# 个人站点

Jekyll 静态站点，用 GitHub Pages 原生构建，不需要配置 GitHub Actions。
推送即发布，没有后端、没有第三方追踪脚本。

---

## 一、上线（约十分钟）

**1. 建仓库**

登录 GitHub，新建一个**公开**仓库，名字必须严格是：

```
你的用户名.github.io
```

比如用户名是 `litao`，仓库名就是 `litao.github.io`。这个命名是 GitHub 识别「个人主站」的唯一方式，写错了站点不会出现在根域名下。

**2. 上传文件**

把本文件夹里的所有内容放进仓库根目录。两种方式任选：

- 网页上传：仓库页面 → Add file → Upload files，把文件拖进去，提交。
- 命令行：

```bash
git init
git add .
git commit -m "初始站点"
git branch -M main
git remote add origin https://github.com/你的用户名/你的用户名.github.io.git
git push -u origin main
```

**3. 打开 Pages**

仓库 → Settings → Pages → Build and deployment → Source 选 **Deploy from a branch**，
分支选 `main`，目录选 `/ (root)`，保存。

等一到两分钟，站点就在 `https://你的用户名.github.io` 上了。

---

## 二、改成你自己的

只有 `_config.yml` 顶部那一段需要改，一共五行：

| 字段 | 改成 |
|---|---|
| `title` / `title_en` | 你的名字（两者相同时英文行会自动隐藏） |
| `tagline` / `tagline_en` | 首页那句定位，中英各一行 |
| `email` | 页脚联系邮箱 |
| `url` | `https://你的用户名.github.io` |

然后编辑 `about.md`，把里面的占位文字换成你自己的介绍。

改完 `_config.yml` 需要重新推送才生效。

---

## 三、日常写作

在 `_posts/` 里新建文件，**文件名必须是 `年-月-日-英文短名.md`** 这个格式，
日期错了或者少了会不显示。

```markdown
---
title: "中文标题"
title_en: "English Title"
summary: "首页列表里显示的一两句话。可以不写。"
date: 2026-09-15
lang: zh
---

正文从这里开始。
```

`lang` 写 `zh` 或 `en`。写 `zh` 时中文段落会自动两端对齐。

**脚注**：正文里 `[^标签]`，文末 `[^标签]: 内容`。序号和位置自动处理。

**引用**：行首加 `>`。

**图片**：压成 WebP 放进 `assets/img/`（用 [Squoosh](https://squoosh.app) 压，一张全宽图控制在 100 KB 以内），然后 `![说明](/assets/img/文件名.webp)`。

**视频**：不要把视频文件放进仓库。嵌播放器：

```html
<div class="embed">
<iframe src="https://www.youtube-nocookie.com/embed/视频ID" title="标题" loading="lazy" allowfullscreen></iframe>
</div>
```

`.embed` 会自动保持 16:9 并且不撑破版心，`loading="lazy"` 让它不拖慢首屏。

**大文件**（讲稿 PDF、数据集）：放 GitHub Releases 或 Zenodo，然后链过来。不计入站点的 1 GB 配额。

写完的两篇示范文章可以直接删掉。

---

## 四、字体

正文西文用 Source Serif 4，中文落到系统里的宋体（Mac 上是 Songti SC，效果最好）。
这两者本属同一设计体系，中英混排时笔画粗细能对上。

Windows 下宋体屏显偏细，如果觉得不好读，把 `_config.yml` 里的

```yaml
typeface: serif
```

改成 `sans`，中文就切到黑体（苹方 / 思源黑体 / 微软雅黑），西文不变。

---

## 五、本地预览（可选）

不装也能用，直接推送到 GitHub 看效果就行。想在本地看：

```bash
gem install bundler
bundle install
bundle exec jekyll serve
```

然后打开 `http://localhost:4000`。

---

## 六、几个注意

- **仓库是公开的**，源文件所有人可见，不只是渲染后的页面。别把私人笔记提交进来——删掉也仍然留在 Git 历史里。
- 站点上限 1 GB，带宽软限制 100 GB/月。纯文字远远用不完，媒体一律外链就不会碰到。
- 只用了 GitHub Pages 白名单内的插件（feed / sitemap / seo-tag），所以原生构建就能跑。以后想加白名单外的插件，需要改成 GitHub Actions 构建。
- 想以后接邮件订阅，在 `_includes/footer.html` 里加一个表单就行，不影响现在的结构。
