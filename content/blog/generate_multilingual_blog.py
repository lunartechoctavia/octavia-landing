#!/usr/bin/env python3
"""
Generate the Multilingual Creator Economy blog post HTML
"""

import json

# Read the markdown content
with open('articles/multilingual-creator-economy-guide.md', 'r', encoding='utf-8') as f:
    content = f.read()

# Read the catalog entry
with open('catalog.json', 'r', encoding='utf-8') as f:
    catalog = json.load(f)
    article = catalog[0]  # First article is our new one

# HTML template
html_template = '''<html lang="en" class="scroll-smooth">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      /* Smooth load: lock the dark background immediately and keep content hidden
         until the Tailwind styles are applied, then fade in — this removes the
         flash of unstyled HTML that makes the load feel janky. */
      html {{ background-color: #050505; }}
      body {{ opacity: 0; transition: opacity 0.5s ease; }}
      body.tw-ready {{ opacity: 1; }}
      @media (prefers-reduced-motion: reduce) {{ body {{ transition: none; }} }}
    </style>
    <noscript><style>body{{opacity:1 !important}}</style></noscript>
    <script>
      (function () {{
        function reveal() {{ if (document.body) document.body.classList.add("tw-ready"); }}
        if (document.readyState !== 'loading') requestAnimationFrame(reveal);
        else document.addEventListener('DOMContentLoaded', function () {{ requestAnimationFrame(reveal); }});
        window.addEventListener('load', reveal);
        setTimeout(reveal, 1500);
      }})();
    </script>
    <title>{title} | Octavia</title>
    <meta name="description" content="{metaDescription}">
    <!-- BLOG_SEO_START -->
    <link rel="canonical" href="https://octavia.lunartech.ai/blog/{slug}">
    <meta property="og:type" content="article">
    <meta property="og:title" content="{title}">
    <meta property="og:description" content="{metaDescription}">
    <meta property="og:url" content="https://octavia.lunartech.ai/blog/{slug}">
    <meta property="og:image" content="https://octavia.lunartech.ai{heroImage}">
    <meta property="article:published_time" content="{publishedAt}">
    <meta property="article:modified_time" content="{updatedAt}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{title}">
    <meta name="twitter:description" content="{metaDescription}">
    <meta name="twitter:image" content="https://octavia.lunartech.ai{heroImage}">
    <script type="application/ld+json">{{"@context":"https://schema.org","@type":"BlogPosting","headline":"{title}","description":"{metaDescription}","image":"https://octavia.lunartech.ai{heroImage}","datePublished":"{publishedAt}","dateModified":"{updatedAt}","wordCount":{bodyWordCount},"timeRequired":"PT{readingMinutes}M","mainEntityOfPage":"https://octavia.lunartech.ai/blog/{slug}","author":{{"@type":"Organization","name":"{author}"}},"publisher":{{"@type":"Organization","name":"Octavia","url":"https://octavia.lunartech.ai"}}}}</script>
    <script type="application/ld+json">{{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{{"@type":"ListItem","position":1,"name":"Home","item":"https://octavia.lunartech.ai"}},{{"@type":"ListItem","position":2,"name":"Blog","item":"https://octavia.lunartech.ai/blog"}},{{"@type":"ListItem","position":3,"name":"{title}","item":"https://octavia.lunartech.ai/blog/{slug}"}}]}}</script>
    <!-- BLOG_SEO_END -->
    <link rel="icon" type="image/jpeg" href="../../assets/lunartechai_logo_black.jpg">
    <link rel="preload" href="../../assets/fonts/geist-latin.woff2" as="font" type="font/woff2" crossorigin>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
    <link rel="preconnect" href="https://cdn.jsdelivr.net">
    <link
        href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&amp;family=Inter:wght@300;400;500;600&amp;display=swap"
        rel="stylesheet">

    <!-- FOUC guard -->
    <style>
      nav .group > div[class~="invisible"] {{ position: absolute; opacity: 0; visibility: hidden; }}
    </style>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>

    <script>
        tailwind.config = {{
            theme: {{
                extend: {{
                    colors: {{
                        purple: {{
                            400: '#A78BFA',
                            500: '#8B5CF6',
                            600: '#7C3AED',
                            900: '#2E1065',
                        }},
                        neutral: {{
                            850: '#1a1a1a',
                            900: '#111111',
                            950: '#050505',
                        }}
                    }},
                    fontFamily: {{
                        sans: ['Geist', 'Inter', 'sans-serif'],
                        display: ['Geist', 'sans-serif'],
                        mono: ['Geist Mono', 'monospace'],
                    }},
                    boxShadow: {{
                        'glow': '0 0 60px -15px rgba(139, 92, 246, 0.15)',
                        'glow-sm': '0 0 20px -5px rgba(139, 92, 246, 0.3)',
                    }},
                }}
            }},
            plugins: [
                function ({{ addUtilities }}) {{
                    addUtilities({{
                        '.perspective-1000': {{ perspective: '1000px' }},
                        '.transform-style-3d': {{ transformStyle: 'preserve-3d' }},
                        '.backface-hidden': {{ backfaceVisibility: 'hidden' }},
                    }})
                }}
            ]
        }}
    </script>

    <style>
        @font-face {{
            font-family: 'Geist';
            font-style: normal;
            font-weight: 300 700;
            font-display: swap;
            src: url('../../assets/fonts/geist-latin.woff2') format('woff2');
        }}

        body {{
            background-color: #050505;
            color: #ffffff;
            font-family: 'Geist', sans-serif;
            overflow-x: hidden;
            overflow-y: auto;
            font-size: 14px;
        }}

        ::-webkit-scrollbar {{
            width: 8px;
        }}

        ::-webkit-scrollbar-track {{
            background: #0a0a0a;
        }}

        ::-webkit-scrollbar-thumb {{
            background: #333;
            border-radius: 4px;
        }}

        ::-webkit-scrollbar-thumb:hover {{
            background: #444;
        }}

        .reveal-on-scroll {{
            opacity: 0;
            transform: translateY(20px);
            filter: blur(5px);
            transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }}

        .reveal-on-scroll.is-visible {{
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
        }}

        /* Follow-us row */
        .fu-row {{
            display: flex; align-items: center; justify-content: center; flex-wrap: nowrap;
            gap: 1rem; padding: 0.5rem 2rem; border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            overflow-x: auto; scrollbar-width: none; -ms-overflow-style: none;
        }}
        .fu-row::-webkit-scrollbar {{ display: none; }}
        .fu-label {{ color: #a3a3a3; font-size: 0.72rem; font-weight: 500; letter-spacing: 0.02em; white-space: nowrap; }}
        .fu-sep {{ width: 1px; height: 14px; background: rgba(255, 255, 255, 0.12); flex: none; }}
        .fu-link {{ display: inline-flex; align-items: center; gap: 0.35rem; color: #d4d4d4; font-size: 0.72rem; font-weight: 500; text-decoration: none; white-space: nowrap; transition: color 0.25s ease; }}
        .fu-link iconify-icon {{ color: #8b5cf6; transition: color 0.25s ease; }}
        .fu-link:hover {{ color: #c4b5fd; }}
        .fu-link:hover iconify-icon {{ color: #a78bfa; }}
        @media (max-width: 767px) {{ .fu-label, .fu-sep {{ display: none; }} }}
    </style>
  <link rel="stylesheet" href="../../assets/octavia-mobile.css?v=1">
  <link rel="stylesheet" href="../../assets/blog/css/blog.css">
</head>

<body class="antialiased selection:bg-purple-500/30 selection:text-white">
'''

print("Generating multilingual creator economy blog post HTML...")
print("This script will create the complete HTML file.")
print("Use the ai-dubbing-for-creators-guide as the template and adapt the content.")
print("\nScript created. Run blog HTML generation next.")
