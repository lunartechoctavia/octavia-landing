import os
import re

# The new button HTML to inject
NEW_BUTTON = '''<!-- Right Actions -->
            <div class="flex items-center gap-4 z-20 shrink-0">
                <a href="https://forms.fillout.com/t/eKguNbaUE6us" class="group relative inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 transition-all text-white shadow-[0_0_20px_-10px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_-5px_rgba(168,85,247,0.5)] overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <iconify-icon icon="lucide:sparkles" width="14" stroke-width="1.5" class="text-purple-300 group-hover:text-purple-200 transition-colors relative z-10"></iconify-icon>
                    <span class="z-10 text-xs font-medium tracking-wide relative">Join the Waitlist</span>
                </a>
            </div>'''

# Pattern: from <!-- Right Actions --> through the closing </div> of the wrapper
PATTERN = re.compile(
    r'<!-- Right Actions -->\s*<div class="flex items-center gap-4 z-20 shrink-0">.*?</div>\s*</div>',
    re.DOTALL
)

REPLACEMENT = NEW_BUTTON + '\n        </div>'

skip = {'index.html', 'index copy.html', 'replace.py'}
files = [f for f in os.listdir('.') if f.endswith('.html') and f not in skip]

for fname in files:
    with open(fname, 'r', encoding='utf-8') as f:
        content = f.read()
    new_content = PATTERN.sub(REPLACEMENT, content, count=1)
    if new_content != content:
        with open(fname, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Updated: {fname}')
    else:
        print(f'No match: {fname}')
