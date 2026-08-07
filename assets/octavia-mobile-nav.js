/* Octavia — mobile navigation panel (shared by every page).
   Pairs with assets/octavia-mobile.css and the #mobile-menu-btn / #mobile-menu
   markup in the header. No-ops on pages that don't have them. */
(function () {
  function init() {
    var btn = document.getElementById('mobile-menu-btn');
    var menu = document.getElementById('mobile-menu');
    var navbar = document.getElementById('navbar-bg');
    if (!btn || !menu || !navbar) return;

    // The panel starts below the header, whose height changes with the
    // follow-us strip and the viewport — measure it rather than hard-coding.
    function syncHeight() {
      document.documentElement.style.setProperty('--nav-h', navbar.getBoundingClientRect().height + 'px');
    }

    function setOpen(open) {
      menu.classList.toggle('is-open', open);
      menu.setAttribute('aria-hidden', open ? 'false' : 'true');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('mnav-open', open);
      if (open) syncHeight();
    }

    syncHeight();
    if (window.ResizeObserver) new ResizeObserver(syncHeight).observe(navbar);
    window.addEventListener('resize', syncHeight);
    window.addEventListener('orientationchange', syncHeight);

    btn.addEventListener('click', function () {
      setOpen(!menu.classList.contains('is-open'));
    });

    // Same-page anchors and page links should dismiss the panel.
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        setOpen(false);
        btn.focus();
      }
    });

    // Crossing into the desktop breakpoint must not leave the body locked.
    var desktop = window.matchMedia('(min-width: 768px)');
    var onChange = function (e) { if (e.matches) setOpen(false); };
    if (desktop.addEventListener) desktop.addEventListener('change', onChange);
    else desktop.addListener(onChange);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
