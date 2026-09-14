/* 给正文标题加一个可点的锚。无依赖，无第三方请求，失败时页面照常可读。 */
(function () {
  'use strict';

  var prose = document.querySelector('.prose');
  if (!prose) return;

  /* kramdown 已经生成了 id，这里只补一个可点的链接 */
  prose.querySelectorAll('h2[id], h3[id]').forEach(function (h) {
    var a = document.createElement('a');
    a.className = 'heading-anchor';
    a.href = '#' + h.id;
    a.setAttribute('aria-label', '指向本节的链接');
    a.textContent = '§';
    h.appendChild(a);
  });
})();
