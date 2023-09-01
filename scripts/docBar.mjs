import { writeFile } from 'fs';
import path, { join } from 'path';
import { fileURLToPath } from 'url';

import packagesPath from './lib/packagesPath.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packages = packagesPath();
let barTemplate = `* [Home](/)

* @hyjs`;

packages.packagesName.forEach((item) => {
  barTemplate += `\n  * [${item}](/hyjs/packages/${item}/README.md)`;
});

writeFile(join(__dirname, '../_navbar.md'), barTemplate, 'utf8', (err) => {
  if (err) throw err;
  console.log('[update _navbar]: update _navbar successful!');
});
