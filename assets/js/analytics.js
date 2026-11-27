/* Google Analytics 4. Loads only when window.SITE.ga4 holds a Measurement ID.
   Tracks page views plus the actions that matter for a portfolio. */
(function () {
  var id = window.SITE && window.SITE.ga4;
  if (!id || !/^G-[A-Z0-9]+$/.test(id)) return;
  var s = document.createElement('script');
  s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  gtag('js', new Date());
  gtag('config', id, { anonymize_ip: true });

  var send = function (name, params) { try { gtag('event', name, params || {}); } catch (e) {} };
  document.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('a, button');
    if (!el) return;
    var href = el.getAttribute('href') || '';
    if (href.indexOf('mailto:') === 0) send(el.hasAttribute('data-booking') ? 'book_meeting_click' : 'email_click', { link_text: (el.textContent || '').trim().slice(0, 60) });
    else if (el.hasAttribute('data-booking')) send('book_meeting_click');
    else if (el.hasAttribute('data-resume-open')) send('resume_request_open');
    else if (href.indexOf('linkedin.com') > -1) send('linkedin_click');
    else if (href.indexOf('gamingonphone.com') > -1) send('outbound_click', { destination: 'GamingonPhone' });
    else if (el.hasAttribute('data-copy')) send('copy_email');
  }, true);
  document.addEventListener('submit', function (e) {
    if (e.target && e.target.getAttribute('name') === 'resume-request') send('generate_lead', { form: 'resume_request' });
  }, true);
})();
