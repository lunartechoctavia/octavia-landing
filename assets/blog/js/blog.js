(function () {
  'use strict';

  // Keep double-click/file:// previews fully navigable without changing the
  // clean production URLs emitted for Vercel.
  const executingScript = document.currentScript;
  if (window.location.protocol === 'file:' && executingScript) {
    const siteRoot = new URL('../../../', executingScript.src);
    document.querySelectorAll('a[href^="/"]').forEach((link) => {
      const original = link.getAttribute('href');
      if (!original || original.startsWith('//')) return;
      const [route, fragment = ''] = original.split('#');
      let localPath;
      if (route === '/') localPath = 'index.html';
      else if (route === '/blog') localPath = 'blog.html';
      else if (route.startsWith('/blog/')) localPath = `${route.slice(1)}/index.html`;
      else if (route.startsWith('/features/')) localPath = `${route.slice(1)}.html`;
      else localPath = `${route.slice(1)}.html`;
      const target = new URL(localPath, siteRoot);
      if (fragment) target.hash = fragment;
      link.href = target.href;
    });
  }

  const progress = document.querySelector('[data-article-progress]');
  const article = document.querySelector('[data-article-body]');

  if (progress && article) {
    const updateProgress = () => {
      const rect = article.getBoundingClientRect();
      const articleTop = window.scrollY + rect.top;
      const articleHeight = article.offsetHeight;
      const viewportBottom = window.scrollY + window.innerHeight;
      const distance = Math.max(0, viewportBottom - articleTop);
      const percent = Math.min(100, Math.max(0, (distance / articleHeight) * 100));
      progress.style.width = `${percent}%`;
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
  }

  const shareButton = document.querySelector('[data-copy-article-link]');
  if (shareButton) {
    const originalLabel = shareButton.getAttribute('aria-label');
    shareButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        shareButton.classList.add('is-copied');
        shareButton.setAttribute('aria-label', 'Copied');
        setTimeout(() => {
          shareButton.classList.remove('is-copied');
          shareButton.setAttribute('aria-label', originalLabel);
        }, 1800);
      } catch (_) {
        window.prompt('Copy this article link:', window.location.href);
      }
    });
  }

  const tocLinks = Array.from(document.querySelectorAll('[data-toc-link]'));
  if (tocLinks.length && 'IntersectionObserver' in window) {
    const byId = new Map(tocLinks.map((link) => [link.getAttribute('href').slice(1), link]));
    const headings = Array.from(document.querySelectorAll('[data-article-body] h2[id], [data-article-body] h3[id]'));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (!visible.length) return;
        tocLinks.forEach((link) => link.classList.remove('is-active'));
        const active = byId.get(visible[0].target.id);
        if (active) active.classList.add('is-active');
      },
      { rootMargin: '-18% 0px -68% 0px', threshold: 0 }
    );
    headings.forEach((heading) => observer.observe(heading));
  }
})();
