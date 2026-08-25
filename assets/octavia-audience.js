/* Octavia — /for/ page interactions.
   Two small things the CSS cannot do alone: staggered reveal on scroll, and
   feeding cursor position to the bento cards' spotlight gradient.
   Everything degrades to a fully visible, static page if this never runs. */
(function () {
  'use strict';

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function reveal() {
    var items = document.querySelectorAll('.oc-a [data-r]');
    if (!items.length) return;

    if (reduced || !('IntersectionObserver' in window)) {
      for (var i = 0; i < items.length; i += 1) items[i].classList.add('is-visible');
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    items.forEach(function (el) { io.observe(el); });
  }

  function spotlight() {
    if (reduced || !window.matchMedia || !window.matchMedia('(hover: hover)').matches) return;
    var cards = document.querySelectorAll('.oc-a-cap');
    if (!cards.length) return;

    var queued = false;
    var pending = [];

    function flush() {
      queued = false;
      for (var i = 0; i < pending.length; i += 1) {
        pending[i].el.style.setProperty('--mx', pending[i].x + 'px');
        pending[i].el.style.setProperty('--my', pending[i].y + 'px');
      }
      pending.length = 0;
    }

    cards.forEach(function (card) {
      card.addEventListener('pointermove', function (event) {
        var rect = card.getBoundingClientRect();
        pending.push({ el: card, x: Math.round(event.clientX - rect.left), y: Math.round(event.clientY - rect.top) });
        if (!queued) { queued = true; requestAnimationFrame(flush); }
      });
    });
  }

  function start() { reveal(); spotlight(); }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
}());
