import fs from 'fs-extra';
import path from 'path';
import rimraf from 'rimraf';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packages = fs.readdirSync(path.resolve(__dirname, '../packages'));
const deleteDirName = ['dist', 'lib', 'tsconfig.json'];

packages.forEach((key) => {
  const pkgDir = path.join(__dirname, `../packages/${key}`);
  deleteDirName.forEach((dirName) => {
    rimraf(path.join(pkgDir, dirName), (err) => {
      if (err) throw err;
      console.log(`[clean message] : clean ${dirName} successful!`);
    });
  });
});
console.log('\n');
