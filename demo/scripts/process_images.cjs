const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SOURCE_DIR = path.join(__dirname, '../Snapseed');
const DEST_DIR = path.join(__dirname, '../public/images/Uncategorized');

if (!fs.existsSync(DEST_DIR)) {
    fs.mkdirSync(DEST_DIR, { recursive: true });
}

const files = fs.readdirSync(SOURCE_DIR).filter(f => f.match(/\.(jpg|jpeg|png)$/i));

console.log(`Found ${files.length} images.`);

files.forEach((file, index) => {
    const srcPath = path.join(SOURCE_DIR, file);
    const destPath = path.join(DEST_DIR, file);

    try {
        // Initial compression: Resize to max 2500px, Quality 80%
        // Using sips (macOS built-in)
        execSync(`sips -Z 2500 -s format jpeg -s formatOptions 80 "${srcPath}" --out "${destPath}"`, { stdio: 'ignore' });

        // Check size
        let stats = fs.statSync(destPath);
        let sizeKB = stats.size / 1024;

        // If > 800KB, compress more
        if (sizeKB > 800) {
            // Try reducing quality to 60%
            execSync(`sips -s formatOptions 60 "${destPath}"`, { stdio: 'ignore' });
            stats = fs.statSync(destPath);
            sizeKB = stats.size / 1024;
        }

        // If still > 800KB, resize down to 2000px
        if (sizeKB > 800) {
            execSync(`sips -Z 2000 "${destPath}"`, { stdio: 'ignore' });
            stats = fs.statSync(destPath);
            sizeKB = stats.size / 1024;
        }

        console.log(`[${index + 1}/${files.length}] Processed ${file}: ${sizeKB.toFixed(0)}KB`);

    } catch (error) {
        console.error(`Error processing ${file}:`, error.message);
    }
});

console.log('Done!');
