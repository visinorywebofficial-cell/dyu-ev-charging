const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf-8');

// The start and end tags for the NEW section
const newSectionStartStr = '    <!-- ─── CINEMATIC GLASS REVIEWS ─────────────────────────── -->';
const newSectionEndStr = '      </div>\n    </section>\n\n    <!-- Glowing Features Section -->';

const newStartIdx = content.indexOf(newSectionStartStr);
const newEndIdx = content.indexOf('    <!-- Glowing Features Section -->', newStartIdx) - 2;

const newSectionContent = content.substring(newStartIdx, newEndIdx);

// The start and end tags for the OLD section
const oldSectionStartStr = '    <!-- Cinematic Reviews Section -->';
const oldSectionEndStr = '    <!-- Footer -->';

const oldStartIdx = content.indexOf(oldSectionStartStr);
const oldEndIdx = content.indexOf('    <!-- Footer -->', oldStartIdx) - 2;

const oldSectionContent = content.substring(oldStartIdx, oldEndIdx);

console.log("New section length:", newSectionContent.length);
console.log("Old section length:", oldSectionContent.length);

if (newStartIdx !== -1 && oldStartIdx !== -1) {
    // 1. Remove the NEW section from its original place (including the newline after it)
    content = content.replace(newSectionContent + '\n\n', '');
    
    // 2. Replace the OLD section with the NEW section
    content = content.replace(oldSectionContent, newSectionContent);
    
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log("Successfully moved the new review section and removed the old one.");
} else {
    console.log("Failed to find sections.");
}
