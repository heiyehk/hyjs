import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packagesPath = path.resolve(__dirname, '../packages');

const packageTemplate = {
  main: 'dist/index.cjs.js',
  module: 'dist/index.esm.js',
  unpkg: 'dist/index.min.js',
  jsdelivr: 'dist/index.min.js',
  types: 'lib/index.d.ts',
  files: ['lib', 'dist'],
  repository: {
    type: 'git',
    url: 'git+https://github.com/heiyehk/hyjs.git'
  },
  scripts: {
    build: 'tsc -b',
    test: 'jest'
  },
  bugs: {
    url: 'https://github.com/heiyehk/hyjs/issues'
  },
  publishConfig: {
    access: 'public'
  },
  gitHead: '6183ec5769fe09562acc49414d935d36ca94e4ab',
  globalName: 'hyjs'
};

const dir = process.argv[2];
packageTemplate.name = `__${dir}__`;
const pkgJsonPath = path.join(packagesPath, dir, 'package.json');
const pkgJson = fs.readJsonSync(pkgJsonPath);
const newJson = { ...pkgJson, ...packageTemplate };
const generateSuccess = fs.writeFileSync(pkgJsonPath, JSON.stringify(newJson, null, 2));

if (generateSuccess) throw generateSuccess;
console.log(`[update package.json]: update ${dir} package.json successful!`);
