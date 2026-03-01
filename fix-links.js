const fs = require('fs');
const path = require('path');

function processFile(filePath) {
    if (!filePath.endsWith('.html')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace ../something.html with /something
    content = content.replace(/href="\.\.\/([^"]+?)\.html(#.*?)?"/g, 'href="/$1$2"');
    
    // Replace something.html with /something (only if it starts with a letter, avoids http/https links natively as long as they aren't parsed this way)
    content = content.replace(/href="([a-zA-Z0-9_\-]+?\/[a-zA-Z0-9_\-]+?)\.html(#.*?)?"/g, 'href="/$1$2"');
    content = content.replace(/href="([a-zA-Z0-9_\-]+?)\.html(#.*?)?"/g, 'href="/$1$2"');
    
    // Fix index paths
    content = content.replace(/href="\/index(#.*?)?"/g, 'href="/$1"');
    content = content.replace(/href="\/index"/g, 'href="/"');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file === 'node_modules' || file === '.git') continue;
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            walkDir(fullPath);
        } else {
            processFile(fullPath);
        }
    }
}

const dirPath = 'd:\\Desktop D\\Apps\\octavia-landing\\octavia-landing';
walkDir(dirPath);
console.log('Done replacing hrefs');
