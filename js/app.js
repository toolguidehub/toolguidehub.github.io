/* ToolGuideHub directory: search, category filter, pagination, favourites, recently viewed */
(function () {
  'use strict';
  var PAGE = 24, S = window.TGH_STORE, BASE = window.TGH_BASE || '';
  var $ = function (id) { return document.getElementById(id); };
  var all = [], bySlug = {}, cats = [], state = { q: '', cat: 'All', page: 1 };
  var FEATURED = ['json-formatter', 'password-generator', 'merge-pdf', 'image-compress', 'qr-code-generator', 'word-counter', 'bmi-calculator', 'base64-encoder'];
  var POPULAR = ['loan-calculator', 'compress-pdf', 'image-resize', 'color-picker', 'unit-converter', 'case-converter', 'mortgage-calculator', 'timestamp-converter'];

  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function href(t) { return BASE + 'en/' + encodeURIComponent(t.s) + '/'; }
  function favs() { return S.get('tgh:fav', []); }

  function card(t) {
    var on = favs().indexOf(t.s) > -1;
    return '<article class="card"><div class="ct"><span class="ic" aria-hidden="true">' + esc(t.i) + '</span>' +
      '<button class="fav" type="button" data-fav="' + esc(t.s) + '" aria-pressed="' + on + '" aria-label="Save ' + esc(t.n) + ' to favourites">' + (on ? '♥' : '♡') + '</button></div>' +
      '<h3>' + esc(t.n) + '</h3><p>' + esc(t.d) + '</p>' +
      '<div class="meta"><span>' + esc(t.c) + '</span><span class="tag">Free</span></div>' +
      '<a class="btn" href="' + href(t) + '">View Tool</a></article>';
  }
  function grid(list) { return '<div class="grid">' + list.map(card).join('') + '</div>'; }

  function score(t, terms) {
    var n = t.n.toLowerCase(), s = t.s, d = t.d.toLowerCase(), c = t.c.toLowerCase(), sc = 0;
    for (var i = 0; i < terms.length; i++) {
      var w = terms[i], hit = 0;
      if (n === w) hit = 100; else if (n.indexOf(w) === 0) hit = 60; else if (n.indexOf(w) > -1) hit = 40;
      else if (s.indexOf(w) > -1) hit = 30; else if (c.indexOf(w) > -1) hit = 20; else if (d.indexOf(w) > -1) hit = 10;
      if (!hit) return 0; sc += hit;
    }
    return sc;
  }
  function filtered() {
    var list = state.cat === 'All' ? all : all.filter(function (t) { return t.c === state.cat; });
    var q = state.q.trim().toLowerCase();
    if (!q) return list;
    var terms = q.split(/\s+/).filter(Boolean), out = [];
    for (var i = 0; i < list.length; i++) { var sc = score(list[i], terms); if (sc) out.push([sc, list[i]]); }
    out.sort(function (a, b) { return b[0] - a[0] || a[1].n.localeCompare(b[1].n); });
    return out.map(function (x) { return x[1]; });
  }

  function pills() {
    var h = '<button class="pill" type="button" data-cat="All" aria-pressed="' + (state.cat === 'All') + '">All<i>' + all.length + '</i></button>';
    cats.forEach(function (c) { h += '<button class="pill" type="button" data-cat="' + esc(c.name) + '" aria-pressed="' + (state.cat === c.name) + '">' + esc(c.name) + '<i>' + c.count + '</i></button>'; });
    $('pills').innerHTML = h;
  }
  function pager(total) {
    var pages = Math.ceil(total / PAGE), p = state.page, h = '';
    if (pages <= 1) { $('pager').innerHTML = ''; return; }
    function b(n, label, dis, cur) { return '<button type="button" data-page="' + n + '"' + (dis ? ' disabled' : '') + (cur ? ' aria-current="page"' : '') + '>' + label + '</button>'; }
    h += b(p - 1, '‹', p === 1);
    var show = {}; [1, 2, p - 1, p, p + 1, pages - 1, pages].forEach(function (x) { if (x >= 1 && x <= pages) show[x] = 1; });
    var last = 0; Object.keys(show).map(Number).sort(function (a, b) { return a - b; }).forEach(function (n) {
      if (n - last > 1) h += '<button type="button" disabled>…</button>'; h += b(n, n, false, n === p); last = n;
    });
    h += b(p + 1, '›', p === pages);
    $('pager').innerHTML = h;
  }
  function render(scroll) {
    var list = filtered(), total = list.length, pages = Math.max(1, Math.ceil(total / PAGE));
    if (state.page > pages) state.page = pages;
    var start = (state.page - 1) * PAGE, slice = list.slice(start, start + PAGE);
    pills();
    $('rtitle').innerHTML = (state.cat === 'All' ? 'All tools' : esc(state.cat)) + (state.q ? ' matching “' + esc(state.q) + '”' : '') +
      ' <small>' + (total ? 'Showing ' + (start + 1) + '–' + (start + slice.length) + ' of ' + total.toLocaleString() : '0 results') + '</small>';
    if (!total) {
      var sugg = cats.slice(0, 6).map(function (c) { return '<button class="pill" type="button" data-cat="' + esc(c.name) + '">' + esc(c.name) + '</button>'; }).join('');
      $('results').innerHTML = '<div class="empty"><h3>No tools found</h3><p>Nothing matched “' + esc(state.q) + '”' + (state.cat !== 'All' ? ' in ' + esc(state.cat) : '') + '. Try a shorter word, check the spelling, or browse a category.</p>' +
        '<p style="margin-top:12px"><button class="btn" type="button" id="clr">Clear search and filters</button></p><div class="pills">' + sugg + '</div></div>';
    } else $('results').innerHTML = grid(slice);
    pager(total);
    $('live').textContent = total + ' tools shown';
    var u = new URL(location.href); u.searchParams.delete('q'); u.searchParams.delete('cat'); u.searchParams.delete('page');
    if (state.q) u.searchParams.set('q', state.q); if (state.cat !== 'All') u.searchParams.set('cat', state.cat); if (state.page > 1) u.searchParams.set('page', state.page);
    try { history.replaceState(null, '', u.pathname + u.search + u.hash); } catch (e) {}
    if (scroll) $('directory').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function personal() {
    var f = favs().map(function (s) { return bySlug[s]; }).filter(Boolean);
    var r = S.get('tgh:recent', []).map(function (x) { return bySlug[x.s]; }).filter(Boolean).slice(0, 8);
    $('favSec').hidden = !f.length; $('recSec').hidden = !r.length;
    if (f.length) $('favGrid').innerHTML = grid(f.slice(0, 12));
    if (r.length) $('recGrid').innerHTML = grid(r);
  }
  function curated() {
    function pick(ids) { return ids.map(function (s) { return bySlug[s]; }).filter(Boolean); }
    $('featGrid').innerHTML = grid(pick(FEATURED).slice(0, 8));
    $('popGrid').innerHTML = grid(pick(POPULAR).slice(0, 8));
  }
  function setCat(c) { state.cat = c; state.page = 1; render(false); }

  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-cat],[data-page],[data-fav],#clr'); if (!t) return;
    if (t.id === 'clr') { state.q = ''; state.cat = 'All'; state.page = 1; $('q').value = ''; render(false); return; }
    if (t.hasAttribute('data-cat')) { setCat(t.getAttribute('data-cat')); if (t.closest('.empty')) return; }
    if (t.hasAttribute('data-page')) { state.page = +t.getAttribute('data-page'); render(true); }
    if (t.hasAttribute('data-fav')) {
      var s = t.getAttribute('data-fav'), f = favs(), i = f.indexOf(s);
      if (i > -1) f.splice(i, 1); else f.unshift(s); S.set('tgh:fav', f);
      render(false); personal();
    }
  });
  var timer;
  function onType() { clearTimeout(timer); timer = setTimeout(function () { state.q = $('q').value; state.page = 1; render(false); }, 90); }

  fetch(BASE + 'data/tools-index.json').then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }).then(function (d) {
    all = d.tools; cats = d.categories; all.forEach(function (t) { bySlug[t.s] = t; });
    $('count').textContent = all.length.toLocaleString();
    var p = new URL(location.href).searchParams;
    state.q = p.get('q') || ''; state.cat = p.get('cat') || 'All'; state.page = parseInt(p.get('page') || '1', 10) || 1;
    if (state.cat !== 'All' && !cats.some(function (c) { return c.name === state.cat; })) state.cat = 'All';
    $('q').value = state.q;
    $('q').addEventListener('input', onType);
    $('sf').addEventListener('submit', function (e) { e.preventDefault(); state.q = $('q').value; state.page = 1; render(true); });
    curated(); personal(); render(false);
    if (state.q && location.search) setTimeout(function () { $('directory').scrollIntoView(); }, 50);
  }).catch(function () {
    $('results').innerHTML = '<div class="empty"><h3>Could not load the tool list</h3><p>Please refresh the page. If this keeps happening, the file data/tools-index.json is missing from the site.</p></div>';
  });
})();
