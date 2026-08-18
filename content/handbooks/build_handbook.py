import os
import re
import markdown
import base64

HERE = os.path.dirname(os.path.abspath(__file__))
OUT_HTML = os.path.join(HERE, "The_Multilingual_Creator_Economy.html")
MD_PATH = os.path.join(HERE, "The_Multilingual_Creator_Economy.md")
LOGO_PATH = r"D:\Desktop D\Apps\octavia-landing\octavia-landing\branding\logo-white.png"

# Check if logo exists, if not use a fallback
if not os.path.exists(LOGO_PATH):
    # Try alternate locations
    alt_paths = [
        r"D:\Desktop D\Apps\octavia-landing\octavia-landing\assets\logo-white.png",
        r"D:\Desktop D\Apps\octavia-landing\octavia-landing\branding\lunartech-logo-white.png",
    ]
    for alt in alt_paths:
        if os.path.exists(alt):
            LOGO_PATH = alt
            break

if os.path.exists(LOGO_PATH):
    with open(LOGO_PATH, "rb") as f:
        logo_b64 = base64.b64encode(f.read()).decode('utf-8')
    LOGO_IMG_HTML = f'<img src="data:image/png;base64,{logo_b64}" alt="LUNARTECH" style="height: 25px; vertical-align: middle;">'
    LOGO_IMG_HTML_FOOTER = f'<img src="data:image/png;base64,{logo_b64}" alt="LUNARTECH" style="height: 14px; vertical-align: middle;">'
    LOGO_IMG_HTML_LARGE = f'<img src="data:image/png;base64,{logo_b64}" alt="LUNARTECH" style="height: 48px; vertical-align: middle;">'
else:
    # Fallback to text
    LOGO_IMG_HTML = '<span style="font-weight: 700; font-size: 14px;">LUNARTECH</span>'
    LOGO_IMG_HTML_FOOTER = '<span style="font-weight: 700; font-size: 10px;">LUNARTECH</span>'
    LOGO_IMG_HTML_LARGE = '<span style="font-weight: 700; font-size: 24px;">LUNARTECH</span>'

LINKS = {
    'logo_link_large': f'<a href="https://lunartech.ai" target="_blank">{LOGO_IMG_HTML_LARGE}</a>',
    'logo_link_medium': f'<a href="https://lunartech.ai" target="_blank">{LOGO_IMG_HTML}</a>',
    'logo_link_small': f'<a href="https://lunartech.ai" target="_blank">{LOGO_IMG_HTML_FOOTER}</a>'
}

with open(MD_PATH, "r", encoding="utf-8") as f:
    md_text = f.read()

# Extract Title
title_match = re.search(r'^#\s+(.+)$', md_text, flags=re.MULTILINE)
if title_match:
    raw_title = title_match.group(1)
    title = raw_title.replace(":", "<br>").strip() if ":" in raw_title else raw_title
    md_text = md_text.replace(title_match.group(0), "")
else:
    title = "The Multilingual Creator Economy<br>How to Expand Reach, Revenue, and Impact"

# Chunking algorithm
blocks = md_text.split('\n\n')
pages_data = []
current_page_blocks = []
current_len = 0
MAX_LEN = 4900
skip_mode = False
chapter_started = False

# Fixed pagination weights for images
UNSPLASH_BANNER_WEIGHT = 1400
CODE_PATTERN_WEIGHT = 2150

for i, block in enumerate(blocks):
    block_clean = block.strip()
    if not block_clean:
        continue

    # Skip TOC if present
    if block_clean.lower().startswith('## table of contents') or block_clean.lower().startswith('# table of contents'):
        skip_mode = True
        continue

    if skip_mode:
        if block_clean.startswith('#'):
            skip_mode = False
        else:
            continue

    # Force new page on major chapters
    if block_clean.startswith('## '):
        if current_page_blocks:
            pages_data.append(current_page_blocks)
        current_page_blocks = [block_clean]
        current_len = len(block_clean)
        chapter_started = True
        continue

    # Calculate weight of block
    if block_clean.startswith('[!['):
        weight = CODE_PATTERN_WEIGHT if 'website-files.com' in block_clean else UNSPLASH_BANNER_WEIGHT
    else:
        weight = len(block_clean)
        weight += block_clean.count('\n') * 80

        if block_clean.startswith('### '):
            weight += 120
        elif block_clean.startswith('#### '):
            weight += 100
        if '|' in block_clean and '-' in block_clean:
            weight += 800
        if block_clean.startswith('`') or '`' in block_clean:
            weight += 600
        if block_clean.startswith('- ') or block_clean.startswith('* ') or block_clean.startswith('1. ') or block_clean.startswith('[ ]'):
            weight += 200
        if block_clean.startswith('> '):
            weight += 300
        if block_clean.startswith('**') and block_clean.count('**') >= 2:
            weight += 150

    # Overlap prevention & Chapter grouping
    if chapter_started:
        current_page_blocks.append(block_clean)
        current_len += weight
        chapter_started = False
    elif current_len + weight > MAX_LEN and current_page_blocks:
        pages_data.append(current_page_blocks)
        current_page_blocks = [block_clean]
        current_len = weight
    else:
        current_page_blocks.append(block_clean)
        current_len += weight

if current_page_blocks:
    pages_data.append(current_page_blocks)

CSS = """
        :root {
            --bg-page: #000000;
            --bg-subtle: #080808;
            --bg-elevated: #111111;
            --text-main: #F4F4F5;
            --text-muted: #A1A1AA;
            --text-dark: #71717A;
            --accent-silver: #D4D4D8;
            --accent-dark: #27272A;
            --font-sans: 'Inter', sans-serif;
            --font-serif: 'Playfair Display', serif;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: var(--font-sans); color: var(--text-main); background-color: #121212; line-height: 1.6; -webkit-font-smoothing: antialiased; }
        @page { size: A4 portrait; margin: 0; }
        @media print { body { background-color: var(--bg-page); } .page-container { box-shadow: none !important; margin: 0 !important; } }

        .page-container { width: 210mm; height: 297mm; background: var(--bg-page); position: relative; margin: 20px auto; box-shadow: 0 10px 40px rgba(0,0,0,0.8); page-break-after: always; overflow: hidden; padding: 18mm 15mm 16mm 15mm; border: 1px solid var(--accent-dark); }
        .page-header { position: absolute; top: 8mm; left: 15mm; right: 15mm; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--accent-dark); padding-bottom: 2mm; font-size: 7pt; text-transform: uppercase; letter-spacing: 2px; color: var(--text-dark); font-weight: 500; }
        .page-footer { position: absolute; bottom: 8mm; left: 15mm; right: 15mm; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--accent-dark); padding-top: 2mm; font-size: 7pt; color: var(--text-dark); }

        /* Cover elements */
        .cover-page { background-color: var(--bg-page); padding: 18mm; display: flex; flex-direction: column; justify-content: space-between; }
        .cover-page .subtitle { font-size: 12pt; color: var(--text-muted); font-weight: 300; letter-spacing: 1px;}
        .cover-graphic { position: absolute; top: -100px; right: -100px; width: 400px; height: 400px; border-radius: 50%; background: radial-gradient(circle, rgba(161,161,170,0.15) 0%, rgba(0,0,0,0) 70%); z-index: 0; pointer-events: none; }

        h1.document-title { font-family: var(--font-serif); font-size: 28pt; line-height: 1.1; margin-bottom: 4mm; letter-spacing: -0.5px; background: linear-gradient(135deg, #FFFFFF, #A1A1AA); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

        .content-body { margin-top: 4mm; height: 255mm; overflow: hidden; }

        /* Markdown generated HTML styles */
        .content-body h2 { font-family: var(--font-serif); font-size: 16pt; line-height: 1.2; color: var(--accent-silver); margin-bottom: 4mm; border-left: 2px solid var(--accent-silver); padding-left: 4mm; font-weight: 400; }
        .content-body h3 { font-size: 11pt; font-weight: 600; margin-top: 4mm; margin-bottom: 2mm; text-transform: uppercase; letter-spacing: 1px; color: var(--text-main); }
        .content-body h4 { font-size: 11pt; font-weight: 600; margin-top: 4mm; margin-bottom: 2mm; color: var(--text-main); }
        .content-body p { font-size: 9.5pt; margin-bottom: 2.5mm; color: var(--text-muted); text-align: justify; line-height: 1.5; }
        .content-body ul, .content-body ol { margin-left: 6mm; margin-bottom: 3mm; color: var(--text-muted); font-size: 9.5pt; text-align: justify; }
        .content-body li { margin-bottom: 2mm; }
        .content-body strong { color: var(--text-main); font-weight: 600; }
        .content-body em { color: var(--accent-silver); font-style: italic; }
        .content-body blockquote { font-family: var(--font-serif); font-size: 10pt; line-height: 1.4; color: var(--text-main); font-style: italic; border-left: 4px solid var(--accent-dark); padding-left: 4mm; margin: 3mm 0; }

        .content-body table { width: 100%; border-collapse: collapse; margin: 3mm 0; font-size: 8pt; background: var(--bg-subtle); }
        .content-body th, .content-body td { padding: 2mm; text-align: left; border-bottom: 1px solid var(--accent-dark); }
        .content-body th { font-weight: 600; color: var(--text-main); text-transform: uppercase; letter-spacing: 1px; border-top: 1px solid var(--accent-dark); border-bottom: 2px solid var(--accent-dark); }
        .content-body tbody tr:nth-child(even) { background-color: var(--bg-elevated); }

        .content-body a { color: var(--accent-silver); text-decoration: none; border-bottom: 1px dotted var(--accent-dark); }
        .content-body code { background: var(--bg-elevated); padding: 1mm 2mm; font-family: monospace; font-size: 8.5pt; border-radius: 4px; border: 1px solid var(--accent-dark); color: #E4E4E7; }
        .content-body pre { background: var(--bg-subtle); padding: 3mm; overflow-x: auto; margin-bottom: 3mm; border: 1px solid var(--accent-dark); border-radius: 4px; }
        .content-body pre code { background: transparent; padding: 0; border: none; }

        .content-body hr { border: 0; height: 1px; background: var(--accent-dark); margin: 4mm 0; }

        /* Image handling */
        .content-body p:has(> a > img) { text-align: center; margin-bottom: 3mm; }
        .content-body img { max-width: 100%; display: block; margin: 0 auto; border-radius: 4px; page-break-inside: avoid; }
        .content-body img[src^="https://images.unsplash.com"] { width: 100%; height: 50mm; object-fit: cover; }
        .content-body img[src*="website-files.com"] { max-height: 78mm; width: auto; }
"""

html_pages = []

# Page 1: Cover Page
html_pages.append(f"""
    <div class="page-container cover-page">
        <div class="cover-graphic"></div>
        <div style="z-index: 1;">
            <div style="margin-top: 10mm; display: inline-block;">
                {LINKS['logo_link_medium']}
            </div>
        </div>
        <div style="z-index: 1;">
            <h1 class="document-title">{title}</h1>
            <div class="subtitle">2026 Creator Enablement Report</div>
        </div>
        <div style="z-index: 1;" class="page-footer" style="position:relative; bottom:0; left:0; right:0; border:none; padding:0;">
            <span>Published August 2026</span>
            <span>LUNARTECH ADVANCED RESEARCH</span>
        </div>
    </div>
""")

# Directory Extraction for TOC
current_chapter = "Overview"
content_pages_html = []
toc_entries = []

current_page_num = 3
for pg_idx, blocks_in_page in enumerate(pages_data):
    found_chapter = None
    for b in blocks_in_page:
        if b.startswith("## "):
            found_chapter = b.replace("## ", "").strip()
            toc_entries.append({"title": found_chapter, "page": current_page_num})
            current_chapter = found_chapter
            break

    page_md = "\n\n".join(blocks_in_page)
    page_html = markdown.markdown(page_md, extensions=['tables', 'fenced_code'])

    html = f"""
    <div class="page-container">
        <div class="page-header"><span>{current_chapter}</span><span>LUNARTECH Advanced Research</span></div>
        <div class="content-body">
            {page_html}
        </div>
        <div class="page-footer">
            <span>{LINKS['logo_link_small']}</span>
            <span>{current_page_num:02d}</span>
        </div>
    </div>
    """
    content_pages_html.append(html)
    current_page_num += 1

# Page 2: Table of Contents
toc_directory_html = ""
for i, entry in enumerate(toc_entries, start=1):
    toc_directory_html += f'<div style="display:flex; margin-bottom: 3.2mm;"><span style="width: 15mm; color: var(--text-main);">{i:02d}.</span><span style="flex:1;">{entry["title"]}</span><span>{entry["page"]:02d}</span></div>'

toc_page = f"""
    <div class="page-container">
        <div class="page-header"><span>Overview</span><span>Table of Contents</span></div>
        <div class="content-body">
            <h2 class="section-title" style="margin-bottom: 4mm; font-family: var(--font-serif); font-size: 16pt; line-height: 1.2; color: var(--accent-silver); border-left: 2px solid var(--accent-silver); padding-left: 4mm; font-weight: 400;">Directory</h2>
            <div style="margin-top: 6mm; font-size: 10.5pt; font-weight: 400; color: var(--text-muted);">
                {toc_directory_html}
            </div>
        </div>
        <div class="page-footer">
            <span>{LINKS['logo_link_small']}</span><span>02</span>
        </div>
    </div>
"""

html_pages.append(toc_page)
html_pages.extend(content_pages_html)

final_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Multilingual Creator Economy</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
    <style>{CSS}</style>
</head>
<body>
    {''.join(html_pages)}
</body>
</html>
"""

with open(OUT_HTML, "w", encoding="utf-8") as f:
    f.write(final_html)

print(f"[SUCCESS] Generated successfully: {len(html_pages)} structured A4 pages")
print(f"[SUCCESS] Output: {OUT_HTML}")
print(f"\nTo generate PDF:")
print(f"  Open the HTML file in Chrome/Edge")
print(f"  Print -> Save as PDF -> Margins: None -> Background graphics: On")
