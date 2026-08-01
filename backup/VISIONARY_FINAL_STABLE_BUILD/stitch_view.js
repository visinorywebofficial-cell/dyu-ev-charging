const fs = require('fs');

const logPath = 'C:\\Users\\shiva\\.gemini\\antigravity\\brain\\e5387afb-e9e5-424b-b200-e619e2715431\\.system_generated\\logs\\overview.txt';
const content = fs.readFileSync(logPath, 'utf8');
const lines = content.split('\n');

let htmlParts = [];
let capture = false;

for (let line of lines) {
    if (!line.trim()) continue;
    try {
        const obj = JSON.parse(line);
        if (obj.source === 'TOOL' && obj.content) {
            let innerObj;
            try {
                innerObj = JSON.parse(obj.content);
            } catch(e) {
                innerObj = { output: obj.content };
            }
            if (innerObj && innerObj.output) {
                // If this is a view_file output
                let output = innerObj.output;
                if (output.includes('Output snapshot:')) {
                    // Extract just the file content
                    let startIdx = output.indexOf('Output snapshot:\n');
                    if (startIdx !== -1) {
                        let text = output.substring(startIdx + 17);
                        if (text.includes('<!DOCTYPE html>') || htmlParts.length > 0) {
                            htmlParts.push(text);
                            // We only need the first 3 or 4 parts to get the whole file
                            if (text.includes('</html>')) {
                                break;
                            }
                        }
                    }
                }
            }
        }
    } catch(e) {}
}

const finalHtml = htmlParts.join('');
fs.writeFileSync('index_morning_stitched.html', finalHtml, 'utf8');
console.log('Stitched HTML size: ' + finalHtml.length);
