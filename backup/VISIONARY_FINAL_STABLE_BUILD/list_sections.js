const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const matches = [...content.matchAll(/<section[\s\S]*?<\/section>/gi)];
for (let i = 0; i < matches.length; i++) {
    const s = matches[i][0];
    const header = s.substring(0, 150).replace(/\n/g, ' ');
    console.log('[Section ' + i + '] size: ' + s.length);
    console.log(header);
    console.log('---');
}
