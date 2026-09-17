# 让同一个图片路径在 Obsidian 和线上都成立。
#
# 文章在 _posts/ 下，资源在 assets/ 下。在 Obsidian 里「上一级」就是
# 库根目录，所以写 ../assets/img/x.jpg 能正常预览。但线上文章的地址是
# /2026/slug/，浏览器会把同一个相对路径解成 /2026/assets/img/x.jpg，404。
#
# 这里在渲染完、写盘前，把 HTML 属性里的 ../assets/ 改写成 /assets/。
# 只动 src= 和 href=，所以正文代码块里演示用的 ../assets/img/...
# 是转义后的纯文本，不会被误改。
#
# 注意：这个插件只在用 GitHub Actions 构建时生效。GitHub Pages 的
# 经典分支构建不加载 _plugins/，图片会 404。

module ObsidianAssetPaths
  PATTERN = %r{\b(src|href)=(["'])\.\./assets/}

  def self.rewrite(page)
    return if page.output.nil?

    baseurl = page.site.config["baseurl"].to_s
    page.output = page.output.gsub(PATTERN) do
      "#{Regexp.last_match(1)}=#{Regexp.last_match(2)}#{baseurl}/assets/"
    end
  end
end

Jekyll::Hooks.register %i[documents pages], :post_render do |page|
  ObsidianAssetPaths.rewrite(page)
end
