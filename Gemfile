source "https://rubygems.org"

# 改用 GitHub Actions 构建后，不再需要 github-pages 这个 gem
# （它的作用是在本地模仿 GitHub 那个冻结在 Jekyll 3.9 的环境）。
gem "jekyll", "~> 4.4"

group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-sitemap"
  gem "jekyll-seo-tag"
end

gem "webrick"   # 本地预览用
