/* ToolGuideHub shared script: base path, consent, ads, tool-page bar, favourites, recently viewed */
(function () {
  'use strict';
  var CFG = window.TGH_CONFIG || {};
  var me = document.currentScript;
  var BASE = me && me.src ? me.src.replace(/js\/tgh-site\.js.*$/, '') : '/';
  window.TGH_BASE = BASE;

  function lsGet(k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } }
  window.TGH_STORE = { get: lsGet, set: lsSet };

  /* ---------- ads + consent (inactive until adsenseClient is configured) ---------- */
  var adsOn = /^ca-pub-\d{10,20}$/.test(CFG.adsenseClient || '');
  function loadAds(personalized) {
    if (!adsOn || window.__tghAds) return; window.__tghAds = 1;
    window.adsbygoogle = window.adsbygoogle || [];
    if (!personalized) window.adsbygoogle.requestNonPersonalizedAds = 1;
    var s = document.createElement('script'); s.async = true; s.crossOrigin = 'anonymous';
    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + CFG.adsenseClient;
    document.head.appendChild(s);
    var slots = document.querySelectorAll('.ad-slot[data-slot]');
    for (var i = 0; i < slots.length; i++) {
      var id = (CFG.adSlots || {})[slots[i].getAttribute('data-slot')];
      if (!id || !/^\d+$/.test(id)) continue;
      slots[i].className += ' on';
      var ins = document.createElement('ins'); ins.className = 'adsbygoogle'; ins.style.display = 'block';
      ins.setAttribute('data-ad-client', CFG.adsenseClient); ins.setAttribute('data-ad-slot', id);
      ins.setAttribute('data-ad-format', 'auto'); ins.setAttribute('data-full-width-responsive', 'true');
      slots[i].appendChild(ins);
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
    }
  }
  function consentBanner() {
    var c = lsGet('tgh:consent', null);
    if (c) { loadAds(c === 'all'); return; }
    var d = document.createElement('div'); d.id = 'tgh-consent'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-label', 'Cookie and privacy choices');
    d.innerHTML = '<b>Privacy choices</b><br>We use Google AdSense to show ads that keep these tools free. You can allow personalised ads or choose non-personalised ads. Details: <a href="' + BASE + 'en/privacy/" style="color:#c4b5fd">Privacy Policy</a>.<div><button class="y" type="button">Allow personalised ads</button><button class="n" type="button">Non-personalised only</button></div>';
    d.querySelector('.y').onclick = function () { lsSet('tgh:consent', 'all'); d.remove(); loadAds(true); };
    d.querySelector('.n').onclick = function () { lsSet('tgh:consent', 'limited'); d.remove(); loadAds(false); };
    document.body.appendChild(d);
  }

  /* ---------- tool-page helpers ---------- */
  var m = location.pathname.match(/\/en\/([^\/]+)\/?(?:index\.html)?$/);
  var slug = m ? decodeURIComponent(m[1]) : '';
  var isTool = slug && ['about', 'privacy', 'terms', 'contact', 'disclaimer'].indexOf(slug) === -1 && !document.getElementById('tgh-static');

  function toolBar() {
    var h1 = document.querySelector('h1');
    var name = h1 ? h1.textContent.replace(/^[^\w\u00C0-\uFFFF]+/, '').trim() : slug;
    var icon = h1 && /^[^\w\s]/.test(h1.textContent.trim()) ? h1.textContent.trim().split(/\s/)[0] : '🔧';
    var rec = lsGet('tgh:recent', []).filter(function (x) { return x && x.s !== slug; });
    rec.unshift({ s: slug, n: name, i: icon, t: Date.now() });
    lsSet('tgh:recent', rec.slice(0, 12));
    var favs = lsGet('tgh:fav', []);
    var bar = document.createElement('div');
    bar.setAttribute('style', 'position:sticky;top:0;z-index:2147483000;display:flex;align-items:center;gap:8px;padding:8px 10px;box-sizing:border-box;width:100%;max-width:100vw;overflow:hidden;background:linear-gradient(135deg,#6d28d9,#4f46e5);color:#fff;font:600 14px system-ui,sans-serif;box-shadow:0 2px 10px rgba(0,0,0,.3)');
    var css = 'color:#fff;text-decoration:none;white-space:nowrap;flex:none;padding:6px 9px;border-radius:8px;background:rgba(255,255,255,.14);border:0;font:inherit;cursor:pointer;line-height:1.2';
    bar.innerHTML = '<a href="' + BASE + '" style="' + css + ';background:none;font-weight:800;padding-left:0">ToolGuideHub</a>' +
      '<a class="tgh-all" href="' + BASE + '#directory" style="' + css + '">All tools</a>' +
      '<span style="flex:1"></span>' +
      '<button type="button" id="tgh-fav" style="' + css + '"></button>';
    document.body.insertBefore(bar, document.body.firstChild);
    var fb = bar.querySelector('#tgh-fav');
    function paint() { var on = favs.indexOf(slug) > -1; fb.textContent = on ? '♥ Saved' : '♡ Save'; fb.setAttribute('aria-pressed', on); }
    fb.onclick = function () { var i = favs.indexOf(slug); if (i > -1) favs.splice(i, 1); else favs.unshift(slug); lsSet('tgh:fav', favs); paint(); };
    paint();
    // ad slot beneath the tool (hidden unless configured)
    var ad = document.createElement('div'); ad.className = 'ad-slot'; ad.setAttribute('data-slot', 'tool');
    ad.setAttribute('style', 'max-width:760px;margin:24px auto;');
    var anchor = document.querySelector('footer') || null;
    if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(ad, anchor); else document.body.appendChild(ad);
    var st = document.createElement('style');
    st.textContent = 'pre,code,table{max-width:100%}pre{overflow-x:auto}table{display:block;overflow-x:auto}textarea,input,select{max-width:100%;box-sizing:border-box}img,canvas,video,svg{max-width:100%;height:auto}body{overflow-wrap:break-word}@media(max-width:350px){.tgh-all{display:none!important}}.ad-slot{display:none}.ad-slot.on{display:block;padding:10px;text-align:center;border:1px solid rgba(148,163,184,.25);border-radius:10px;min-height:100px}.ad-slot.on:before{content:"Advertisement";display:block;font:11px system-ui;color:#94a3b8;margin-bottom:6px}';
    document.head.appendChild(st);
  }

  function ready(f) { if (document.readyState !== 'loading') f(); else document.addEventListener('DOMContentLoaded', f); }
  ready(function () {
    if (isTool) toolBar();
    if (adsOn) consentBanner();
    var b = document.getElementById('burger'), n = document.getElementById('nav');
    if (b && n) b.onclick = function () { var o = n.classList.toggle('open'); b.setAttribute('aria-expanded', o); };
  });
})();
