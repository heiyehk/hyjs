import { writeFile } from 'fs';
import path, { join } from 'path';
import packagesPath from './lib/packagesPath.mjs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packages = packagesPath();
let barTemplate = '* [Home](/)';

packages.packagesName.forEach(item => {
  barTemplate += `\n* [${item}](/packages/${item}/README.md)`;
});

writeFile(join(__dirname, '../_sidebar.md'), barTemplate, 'utf8', (err) => {
  if (err) throw err;
  console.log(`[update _sidebar]: update _sidebar successful!`);
});
