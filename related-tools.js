// Related Tools loader (ToolGuideHub): works under any base path, e.g. /Toolguidehub/
(function () {
  'use strict';
  var s = document.getElementById('related-tools-section');
  if (!s) return;
  var me = document.currentScript;
  var BASE = me && me.src ? me.src.replace(/related-tools\.js.*$/, '') : '/';
  var m = location.pathname.match(/\/en\/([^\/]+)\/?(?:index\.html)?$/);
  var slug = m ? decodeURIComponent(m[1]) : '';
  if (!slug) { s.innerHTML = ''; return; }
  function esc(x) { return String(x).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  fetch(BASE + 'related-tools.json').then(function (r) { if (!r.ok) throw 0; return r.json(); }).then(function (d) {
    var t = (d.en || {})[slug];
    if (!t || !t.related || !t.related.length) { s.innerHTML = ''; return; }
    var h = '<div class="related-tools-inner"><h3 class="related-tools-title">🔗 You May Also Like</h3><div class="related-tools-grid">';
    t.related.forEach(function (r) {
      h += '<a href="' + BASE + 'en/' + encodeURIComponent(r.slug) + '/" class="related-tool-card"><span class="related-tool-icon">' + esc(r.icon || '🔧') + '</span><span class="related-tool-name">' + esc(r.name) + '</span></a>';
    });
    s.innerHTML = h + '</div></div>';
  }).catch(function () { s.innerHTML = ''; });
})();
