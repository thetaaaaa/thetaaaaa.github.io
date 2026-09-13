/* 两件小事：给正文标题加可点的锚，给代码块加复制按钮。
   无依赖，无第三方请求，失败时页面照常可读。 */
(function () {
  'use strict';

  var prose = document.querySelector('.prose');
  if (!prose) return;

  /* 标题锚 —— kramdown 已经生成了 id，这里只补一个可点的链接 */
  prose.querySelectorAll('h2[id], h3[id]').forEach(function (h) {
    var a = document.createElement('a');
    a.className = 'heading-anchor';
    a.href = '#' + h.id;
    a.setAttribute('aria-label', '指向本节的链接');
    a.textContent = '§';
    h.appendChild(a);
  });

  /* 代码块复制按钮 */
  if (!navigator.clipboard) return;          // 不支持就不加，免得点了没反应

  prose.querySelectorAll('div.highlighter-rouge').forEach(function (box) {
    var code = box.querySelector('pre');
    if (!code) return;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'copy-btn';
    btn.textContent = '复制';

    btn.addEventListener('click', function () {
      navigator.clipboard.writeText(code.innerText.replace(/\n$/, '')).then(
        function () { flash('已复制'); },
        function () { flash('复制失败'); }
      );
    });

    function flash(msg) {
      btn.textContent = msg;
      btn.classList.add('is-done');
      setTimeout(function () {
        btn.textContent = '复制';
        btn.classList.remove('is-done');
      }, 1600);
    }

    box.classList.add('has-copy');
    box.appendChild(btn);
  });
})();
