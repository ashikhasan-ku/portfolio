/* =========================================================
   Site behaviour, shared by every page.
   You should rarely need to edit this file: career facts live in
   career-data.js, words live in the .html pages.
   ========================================================= */
(function () {
  var root = document.documentElement;
  root.classList.add('js');
  var C = window.CAREER || { roles: [] };
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  /* ---------- Dates ---------- */
  var now = new Date();
  var nowM = now.getFullYear() * 12 + now.getMonth() + (now.getDate() - 1) / 31;
  function m(ym) { if (ym === 'now') return nowM; var p = ym.split('-'); return +p[0] * 12 + (+p[1] - 1); }
  function endM(ym) { return ym === 'now' ? nowM : m(ym) + 1; } // end month is inclusive
  function label(ym) { if (ym === 'now') return 'Present'; var p = ym.split('-'); return MONTHS[+p[1] - 1] + ' ' + p[0]; }
  function duration(s, e) {
    var total = Math.max(1, Math.round(endM(e) - m(s)));
    var y = Math.floor(total / 12), mo = total % 12, out = [];
    if (y) out.push(y + (y === 1 ? ' yr' : ' yrs'));
    if (mo) out.push(mo + (mo === 1 ? ' mo' : ' mos'));
    return out.join(' ');
  }
  var byId = {};
  C.roles.forEach(function (r) { byId[r.id] = r; });
  var first = C.roles.reduce(function (a, r) { return Math.min(a, m(r.start)); }, Infinity);

  /* Years of experience: "5+ years", becomes "nearly 6 years" in the last quarter */
  var yrs = (nowM - first) / 12, whole = Math.floor(yrs);
  var expText = (yrs - whole >= 0.75) ? 'nearly ' + (whole + 1) + ' years' : whole + '+ years';
  document.querySelectorAll('[data-exp]').forEach(function (el) {
    el.textContent = el.dataset.exp === 'cap' ? expText.charAt(0).toUpperCase() + expText.slice(1) : expText;
  });
  document.querySelectorAll('[data-dates]').forEach(function (el) {
    var r = byId[el.dataset.dates]; if (r) el.textContent = label(r.start) + ' – ' + label(r.end);
  });
  document.querySelectorAll('[data-duration]').forEach(function (el) {
    var r = byId[el.dataset.duration]; if (r) el.textContent = duration(r.start, r.end);
  });
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = now.getFullYear(); });

  /* ---------- Logos: try each source, then the site favicon, then a monogram ---------- */
  function initials(name) { return name.replace(/\(.*\)/, '').replace(/\.(com|asia|org|net)\b/i, '').split(/[\s.]+/).filter(Boolean).slice(0, 2).map(function (w) { return w[0]; }).join('').toUpperCase(); }
  function fillLogo(el, name, sources) {
    el.classList.add('logo');
    el.setAttribute('aria-hidden', 'true');
    var i = 0;
    var mono = function () { el.innerHTML = ''; el.classList.add('is-mono'); el.textContent = initials(name); };
    var next = function () {
      if (i >= sources.length) return mono();
      var img = new Image();
      img.alt = '';
      img.decoding = 'async';
      img.referrerPolicy = 'no-referrer';
      img.onload = function () { if (img.naturalWidth < 24) { i++; next(); return; } el.classList.remove('is-mono'); el.innerHTML = ''; el.appendChild(img); };
      img.onerror = function () { i++; next(); };
      img.src = sources[i];
    };
    mono();
    next();
  }
  function logoFor(el) {
    var r = byId[el.dataset.logo];
    var name = r ? r.company : (el.dataset.name || '?');
    var domain = r ? r.domain : el.dataset.domain;
    var srcs = (r && r.logos ? r.logos.slice() : []);
    if (el.dataset.src) srcs.unshift(el.dataset.src);
    if (domain) srcs.push('https://www.google.com/s2/favicons?domain=' + domain + '&sz=128');
    fillLogo(el, name, srcs);
  }

  /* ---------- Career timeline (Gantt) ---------- */
  function renderTimeline(host) {
    var roles = C.roles.slice().sort(function (a, b) { return m(a.start) - m(b.start); });
    var startYear = Math.floor(first / 12);
    var endYear = Math.floor((nowM + 3) / 12) + 1;           // always a little room after today
    var span = (endYear - startYear) * 12, start = startYear * 12;
    var pct = function (x) { return Math.max(0, Math.min(100, (x - start) / span * 100)); };
    var years = [];
    for (var y = startYear; y < endYear; y++) years.push('<li>' + y + '</li>');
    var compact = host.hasAttribute('data-compact');

    var rows = roles.map(function (r, i) {
      var s = pct(m(r.start)), e = pct(Math.max(endM(r.end), r.end === 'now' ? m(r.start) + 3 : 0));
      var ms = (r.milestones || []).map(function (x) {
        return '<span class="plan-ms" style="--m:' + pct(m(x.date) + 0.5) + '%" title="' + x.label + ', ' + label(x.date) + '"></span>' +
          '<span class="plan-ms-label" style="--m:' + pct(m(x.date) + 0.5) + '%" aria-hidden="true">' + x.label + '</span>';
      }).join('');
      var href = host.dataset.link === 'anchor' ? '#' + r.id : '/career.html#' + r.id;
      var tipSide = s > 62 ? ' tip-left' : '';
      return '<li class="plan-row' + (r.end === 'now' ? ' is-current' : '') + tipSide + '" style="--i:' + i + '">' +
        '<a class="plan-label" href="' + href + '"><span data-logo="' + r.id + '"></span><span class="plan-name"><b>' + r.company + '</b><span>' + r.title + '</span></span></a>' +
        '<span class="plan-track"><span class="plan-bar" style="--s:' + s + '%;--w:' + (e - s) + '%"></span>' + ms +
        '<span class="plan-tip" style="--s:' + s + '%;--e:' + e + '%" aria-hidden="true"><b>' + label(r.start) + ' – ' + label(r.end) + '</b>' + r.highlight + '</span></span>' +
        '<span class="sr-only">' + label(r.start) + ' to ' + label(r.end) + '. ' + r.highlight + '.</span></li>';
    }).join('');

    host.innerHTML =
      '<figcaption class="plan-caption"><span>Career plan, ' + startYear + ' to today</span>' +
      '<span class="plan-legend"><i class="lg-bar" aria-hidden="true"></i>Role<i class="lg-ms" aria-hidden="true"></i>Milestone' + (compact ? '' : '<i class="lg-today" aria-hidden="true"></i>Today') + '</span></figcaption>' +
      '<div class="plan-body" style="--years:' + (endYear - startYear) + '">' +
      '<ol class="plan-axis" aria-hidden="true">' + years.join('') + '</ol>' +
      '<ol class="plan-rows">' + rows + '</ol>' +
      '<span class="plan-today" style="--t:' + pct(nowM) / 100 + '" aria-hidden="true"><span>Today</span></span></div>';

    host.querySelectorAll('[data-logo]').forEach(logoFor);
    var draw = function () { host.classList.add('is-drawn'); };
    if (reduceMotion || !('IntersectionObserver' in window)) return draw();
    var io = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { draw(); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(host);
  }
  document.querySelectorAll('[data-timeline]').forEach(renderTimeline);
  document.querySelectorAll('[data-logo]').forEach(function (el) { if (!el.classList.contains('logo')) logoFor(el); });

  /* ---------- Count-up numbers ---------- */
  var counters = document.querySelectorAll('[data-count]');
  function runCount(el) {
    var target = parseFloat(el.dataset.count), dur = 1400, t0 = null;
    var fmt = function (v) { return Math.round(v).toLocaleString('en-US'); };
    if (reduceMotion) { el.textContent = fmt(target); return; }
    var step = function (t) {
      if (!t0) t0 = t;
      var p = Math.min(1, (t - t0) / dur), eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * eased);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  if (counters.length) {
    if ('IntersectionObserver' in window) {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { runCount(en.target); cio.unobserve(en.target); } });
      }, { threshold: 0.6 });
      counters.forEach(function (c) { cio.observe(c); });
    } else counters.forEach(runCount);
  }

  /* ---------- Photos: hide a slot until its file exists ---------- */
  document.querySelectorAll('img[data-photo]').forEach(function (img) {
    var frame = img.closest('[data-photo-frame]') || img.parentElement;
    var missing = function () { frame.classList.add('is-missing'); };
    var ok = function () { frame.classList.add('has-photo'); };
    if (img.complete) { (img.naturalWidth ? ok : missing)(); }
    img.addEventListener('error', missing);
    img.addEventListener('load', ok);
  });

  /* ---------- Marathon route draws once when seen ---------- */
  document.querySelectorAll('[data-route]').forEach(function (svg) {
    if (reduceMotion || !('IntersectionObserver' in window)) return svg.classList.add('is-drawn');
    var rio = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { svg.classList.add('is-drawn'); rio.disconnect(); } }, { threshold: 0.4 });
    rio.observe(svg);
  });

  /* ---------- Theme ---------- */
  var toggle = document.querySelector('[data-theme-toggle]');
  var mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
  var theme = function () { return root.dataset.theme || (mq && mq.matches ? 'dark' : 'light'); };
  var sync = function () {
    if (!toggle) return;
    toggle.setAttribute('aria-label', 'Switch to ' + (theme() === 'dark' ? 'light' : 'dark') + ' theme');
    document.querySelectorAll('meta[name="theme-color"]').forEach(function (x) { x.setAttribute('content', theme() === 'dark' ? '#0C1424' : '#F3F5F9'); });
  };
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = theme() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) {}
      sync();
    });
    sync();
  }

  /* ---------- Header ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Career page: rail follows the role you are reading ---------- */
  var railLinks = document.querySelectorAll('.rail a[href^="#"]');
  if (railLinks.length && 'IntersectionObserver' in window) {
    var map = {};
    railLinks.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          railLinks.forEach(function (a) { a.removeAttribute('aria-current'); });
          map[en.target.id].setAttribute('aria-current', 'step');
        }
      });
    }, { rootMargin: '-35% 0px -60% 0px' });
    Object.keys(map).forEach(function (id) { var el = document.getElementById(id); if (el) spy.observe(el); });
  }


  /* ---------- Tabs (lifecycle on the Work page) ---------- */
  document.querySelectorAll('[data-tabs]').forEach(function (box) {
    var tabs = Array.prototype.slice.call(box.querySelectorAll('[role="tab"]'));
    var select = function (t, focus) {
      tabs.forEach(function (x) {
        var on = x === t;
        x.setAttribute('aria-selected', on);
        x.tabIndex = on ? 0 : -1;
        document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
      });
      if (focus) t.focus();
    };
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        var n = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
        if (n === undefined) return;
        e.preventDefault();
        select(tabs[(n + tabs.length) % tabs.length], true);
      });
    });
    select(tabs[0]);
  });

  /* ---------- Race deck: click, swipe or arrow keys to shuffle ---------- */
  document.querySelectorAll('[data-deck]').forEach(function (deck) {
    var stack = deck.querySelector('.deck-stack');
    var cards = Array.prototype.slice.call(deck.querySelectorAll('.deck-card'));
    var count = deck.querySelector('.deck-count');
    var order = cards.map(function (_, i) { return i; });
    var paint = function () {
      order.forEach(function (ci, pos) {
        cards[ci].dataset.pos = Math.min(pos, 2);
        cards[ci].setAttribute('aria-hidden', pos === 0 ? 'false' : 'true');
      });
      if (count) count.textContent = (order[0] + 1) + ' / ' + cards.length;
    };
    var next = function () {
      var top = cards[order[0]];
      if (reduceMotion) { order.push(order.shift()); return paint(); }
      top.classList.add('is-leaving');
      setTimeout(function () { top.classList.remove('is-leaving'); order.push(order.shift()); paint(); }, 280);
    };
    var prev = function () { order.unshift(order.pop()); paint(); };
    stack.addEventListener('click', next);
    deck.querySelector('[data-deck-next]').addEventListener('click', next);
    deck.querySelector('[data-deck-prev]').addEventListener('click', prev);
    deck.tabIndex = 0;
    deck.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    });
    var x0 = null;
    stack.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    stack.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); }
    });
    paint();
  });

  /* ---------- Dialog helpers ---------- */
  var openDialog = function (d) { if (d && d.showModal && !d.open) d.showModal(); };
  document.querySelectorAll('dialog').forEach(function (d) {
    d.addEventListener('click', function (e) { if (e.target === d) d.close(); });
    d.querySelectorAll('[data-dialog-close]').forEach(function (b) { b.addEventListener('click', function () { d.close(); }); });
  });

  /* ---------- Photo viewer for any [data-gallery] ---------- */
  var lb = document.getElementById('lightbox');
  if (lb && lb.showModal) {
    var lbImg = lb.querySelector('img'), lbCap = lb.querySelector('figcaption');
    var set = [], at = 0;
    var show = function (i) {
      at = (i + set.length) % set.length;
      var f = set[at], img = f.querySelector('img'), cap = f.querySelector('figcaption');
      lbImg.src = img.currentSrc || img.src; lbImg.alt = img.alt;
      lbCap.textContent = cap ? cap.textContent : img.alt;
    };
    document.querySelectorAll('[data-gallery]').forEach(function (g) {
      var figs = Array.prototype.slice.call(g.querySelectorAll('figure'));
      figs.forEach(function (f, i) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'zoom-btn';
        btn.setAttribute('aria-label', 'View larger: ' + (f.querySelector('img').alt || 'photo'));
        btn.addEventListener('click', function () { set = figs; show(i); openDialog(lb); });
        f.appendChild(btn);
      });
    });
    lb.querySelector('.lb-prev').addEventListener('click', function () { show(at - 1); });
    lb.querySelector('.lb-next').addEventListener('click', function () { show(at + 1); });
    lb.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') show(at + 1);
      if (e.key === 'ArrowLeft') show(at - 1);
    });
  }

  /* ---------- Résumé request (Netlify Forms, sent without leaving the page) ---------- */
  var rd = document.getElementById('resume-dialog');
  if (rd) {
    document.querySelectorAll('[data-resume-open]').forEach(function (b) {
      b.addEventListener('click', function () {
        if (!rd.showModal) { location.href = 'mailto:ashikhasan.ku@gmail.com?subject=R%C3%A9sum%C3%A9%20request'; return; }
        openDialog(rd);
        var first = rd.querySelector('input[name="name"]'); if (first) first.focus();
      });
    });
    var form = rd.querySelector('form'), done = rd.querySelector('.sheet-done'), err = rd.querySelector('.form-error');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      err.textContent = '';
      if (!form.checkValidity()) { err.textContent = 'Add your name and a valid email address.'; form.reportValidity(); return; }
      var btn = form.querySelector('button[type="submit"]'); btn.disabled = true; btn.textContent = 'Sending…';
      fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(new FormData(form)).toString() })
        .then(function (r) {
          if (!r.ok) throw new Error(r.status);
          form.hidden = true; done.hidden = false; form.reset();
          var c = done.querySelector('button'); if (c) c.focus();
        })
        .catch(function () { err.textContent = 'The request didn’t go through. Email me at ashikhasan.ku@gmail.com instead.'; })
        .then(function () { btn.disabled = false; btn.textContent = 'Send request'; });
    });
    rd.addEventListener('close', function () { form.hidden = false; done.hidden = true; });
  }

  /* ---------- Copy email ---------- */
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    var status = document.querySelector('.copy-status');
    btn.addEventListener('click', function () {
      var text = btn.dataset.copy, original = btn.textContent;
      var done = function () {
        btn.textContent = 'Copied';
        if (status) status.textContent = 'Email address copied to your clipboard.';
        setTimeout(function () { btn.textContent = original; if (status) status.textContent = ''; }, 2500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { if (status) status.textContent = 'Copy failed. The address is ' + text + '.'; });
      } else if (status) status.textContent = 'The address is ' + text + '.';
    });
  });
})();
