/* =========================================================
   Ashik Hasan — portfolio behaviour
   1. Career plan (Gantt) positions bars from data-start / data-end
   2. Theme toggle (light / dark), remembered per browser
   3. Header border on scroll + active nav link
   4. Copy-email button
   ========================================================= */
(function () {
  document.documentElement.classList.add('js');

  /* ---------- 1. Career plan ---------- */
  var plan = document.querySelector('.plan');
  if (plan) {
    var toMonths = function (ym) {
      if (ym === 'now') {
        var d = new Date();
        return d.getFullYear() * 12 + d.getMonth() + d.getDate() / 31;
      }
      var p = ym.split('-');
      return Number(p[0]) * 12 + Number(p[1]) - 1;
    };
    var start = toMonths(plan.dataset.rangeStart);
    var end = toMonths(plan.dataset.rangeEnd);
    var span = end - start;
    var pct = function (m) { return Math.max(0, Math.min(100, ((m - start) / span) * 100)); };

    plan.querySelectorAll('.plan-row').forEach(function (row, i) {
      var s = toMonths(row.dataset.start);
      // "end" months are inclusive, so a role ending in Aug fills Aug
      var e = row.dataset.end === 'now' ? toMonths('now') : toMonths(row.dataset.end) + 1;
      var bar = row.querySelector('.plan-bar');
      var track = row.querySelector('.plan-track');
      if (row.dataset.end === 'now') e = Math.max(e, s + 3); // keep a new role visible
      bar.style.setProperty('--s', pct(s) + '%');
      bar.style.setProperty('--w', (pct(e) - pct(s)) + '%');
      bar.style.setProperty('--i', i);

      // Milestones: data-milestones="YYYY-MM|Label;YYYY-MM|Label"
      (row.dataset.milestones || '').split(';').filter(Boolean).forEach(function (item) {
        var parts = item.split('|');
        var m = pct(toMonths(parts[0]));
        var ms = document.createElement('span');
        ms.className = 'plan-ms';
        ms.style.setProperty('--m', m + '%');
        ms.title = parts[1] || '';
        track.appendChild(ms);
        if (parts[1]) {
          var lbl = document.createElement('span');
          lbl.className = 'plan-ms-label';
          lbl.setAttribute('aria-hidden', 'true');
          lbl.style.setProperty('--m', m + '%');
          lbl.textContent = parts[1];
          track.appendChild(lbl);
        }
      });
    });

    var today = plan.querySelector('.plan-today');
    if (today) today.style.setProperty('--t', pct(toMonths('now')) / 100);

    var draw = function () { plan.classList.add('is-drawn'); };
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) { draw(); io.disconnect(); }
      }, { threshold: 0.25 });
      io.observe(plan);
    } else { draw(); }
  }

  /* ---------- 2. Theme toggle ---------- */
  var root = document.documentElement;
  var toggle = document.querySelector('[data-theme-toggle]');
  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
  var currentTheme = function () {
    return root.dataset.theme || (prefersDark && prefersDark.matches ? 'dark' : 'light');
  };
  var syncToggle = function () {
    if (!toggle) return;
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    toggle.setAttribute('aria-label', 'Switch to ' + next + ' theme');
    var meta = document.querySelectorAll('meta[name="theme-color"]');
    meta.forEach(function (m) { m.setAttribute('content', currentTheme() === 'dark' ? '#0F1A2E' : '#F4F6F9'); });
  };
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) {}
      syncToggle();
    });
    syncToggle();
  }

  /* ---------- 3. Header + active section ---------- */
  var header = document.querySelector('.site-header');
  var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var links = document.querySelectorAll('.nav-list a[href^="#"]');
  if ('IntersectionObserver' in window && links.length) {
    var map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          links.forEach(function (a) { a.removeAttribute('aria-current'); });
          map[en.target.id].setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) { var el = document.getElementById(id); if (el) spy.observe(el); });
  }

  /* Open a role when someone jumps to it from the career plan */
  var openFromHash = function () {
    var el = location.hash && document.querySelector(location.hash + ' details');
    if (el) el.open = true;
  };
  window.addEventListener('hashchange', openFromHash);
  openFromHash();

  /* ---------- 4. Copy email ---------- */
  var copyBtn = document.querySelector('[data-copy]');
  var status = document.querySelector('.copy-status');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var text = copyBtn.dataset.copy;
      var done = function () {
        copyBtn.textContent = 'Copied';
        if (status) status.textContent = 'Email address copied to your clipboard.';
        setTimeout(function () { copyBtn.textContent = 'Copy email'; if (status) status.textContent = ''; }, 2500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { if (status) status.textContent = 'Copy failed. The address is ' + text + '.'; });
      } else if (status) { status.textContent = 'The address is ' + text + '.'; }
    });
  }

  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
