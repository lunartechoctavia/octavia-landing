/* Octavia theme switch. Stores the choice per visitor; dark is the default.
   The saved theme is applied before first paint by an inline script in <head>;
   this file only handles the toggle.

   The change travels as one soft-edged wave of the new theme, spreading out
   from the switch across the whole viewport (View Transitions API), while the
   switch's knob glides across in step. Browsers without view transitions get a
   synchronised colour fade instead; reduced-motion visitors get a short
   crossfade with nothing travelling. Timings pair with section 10 of
   assets/octavia-theme.css. */
(function () {
  var KEY = 'octavia-theme';
  var WAVE_MS = 2000;
  var WAVE_EASE = 'cubic-bezier(0.45, 0, 0.4, 1)';  /* --tt-ease */
  var FADE_MS = 900;                                 /* --tt-fade */
  var CORE = 0.7;   /* share of the wave's radius that is fully opaque (the mask's first stop) */
  var LEAD = 1.25;  /* the old theme parts this much ahead of the new one... */
  var BAND = { light: '#c4b5fd', dark: '#8b5cf6' };  /* ...and this glows in the gap: dawn, dusk */

  var root = document.documentElement;
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;

  var wanted = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  var running = null;
  var fadeTimer = 0;

  function apply(theme, persist) {
    root.setAttribute('data-theme', theme);
    root.style.backgroundColor = theme === 'light' ? '#ffffff' : '#050505';
    btn.setAttribute('aria-pressed', String(theme === 'light'));
    if (persist) {
      try { localStorage.setItem(KEY, theme); } catch (e) {}
    }
  }

  function reducedMotion() {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  /* No view transitions: every colour fades on one shared clock, so nothing
     snaps ahead or lags behind. */
  function fade(theme) {
    clearTimeout(fadeTimer);
    root.classList.add('theme-fading');
    apply(theme, true);
    fadeTimer = setTimeout(function () { root.classList.remove('theme-fading'); }, FADE_MS + 100);
  }

  function transition(theme, mode) {
    var r = btn.getBoundingClientRect();
    var x = r.left + r.width / 2;
    var y = r.top + r.height / 2;
    var w = window.innerWidth;
    var h = window.innerHeight;
    /* the opaque core, not just the soft edge, has to reach the farthest corner */
    var reach = Math.sqrt(Math.pow(Math.max(x, w - x), 2) + Math.pow(Math.max(y, h - y), 2));
    var size = Math.ceil((reach / CORE) * 2);
    var hole = Math.ceil(size * LEAD);
    var anims = [];

    function grow(pseudo, s, rest) {
      return root.animate(
        {
          maskSize: ['0px 0px' + rest, s + 'px ' + s + 'px' + rest],
          maskPosition: [x + 'px ' + y + 'px' + rest.replace(/100%/g, '0px'),
                         (x - s / 2) + 'px ' + (y - s / 2) + 'px' + rest.replace(/100%/g, '0px')]
        },
        { duration: WAVE_MS, easing: WAVE_EASE, fill: 'both', pseudoElement: pseudo }
      );
    }

    root.classList.add('theme-switching', mode);
    root.style.setProperty('--tt-band', BAND[theme]);
    var vt = document.startViewTransition(function () { apply(theme, true); });
    running = vt;

    if (mode === 'theme-wave') {
      vt.ready.then(function () {
        /* the new theme's disc, and the hole that opens ahead of it in the old
           theme (its second mask layer is the full-viewport layer it is cut from) */
        anims.push(grow('::view-transition-new(root)', size, ''));
        anims.push(grow('::view-transition-old(root)', hole, ', 100% 100%'));
      }, function () {});
    }

    function done() {
      anims.forEach(function (a) { a.cancel(); });
      if (running !== vt) return;
      running = null;
      root.classList.remove('theme-switching', mode);
      root.style.removeProperty('--tt-band');
    }
    vt.finished.then(done, done);
  }

  apply(wanted, false);

  btn.addEventListener('click', function () {
    wanted = wanted === 'light' ? 'dark' : 'light';
    if (running) {
      /* a second click mid-wave: land the first change, then start the next */
      var prev = running;
      running = null;
      prev.skipTransition();
      root.classList.remove('theme-wave', 'theme-soft');
    }
    if (!document.startViewTransition) fade(wanted);
    else transition(wanted, reducedMotion() ? 'theme-soft' : 'theme-wave');
  });
})();
