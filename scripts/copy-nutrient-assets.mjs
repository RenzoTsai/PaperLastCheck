import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');
const sourceDir = path.join(projectRoot, 'node_modules', '@nutrient-sdk', 'viewer', 'dist');
const destDir = path.join(projectRoot, 'public', 'nutrient-viewer');

async function copyAssets() {
  try {
    if (!fs.existsSync(sourceDir)) {
      console.error(`Source directory not found: ${sourceDir}`);
      console.error('Did you forget to run "npm install"?');
      process.exit(1);
    }

    await fs.ensureDir(destDir);
    await fs.copy(sourceDir, destDir);
    console.log('Successfully copied Nutrient Viewer assets to public directory.');
  } catch (error) {
    console.error('Error copying Nutrient Viewer assets:', error);
    process.exit(1);
  }
}

copyAssets();

