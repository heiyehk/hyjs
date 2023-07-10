import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const tsconfigTemplate = {
  extends: '../../tsconfig.json',
  compilerOptions: {
    outDir: './lib',
    rootDir: './src'
  },
  exclude: ['node_modules', 'dist']
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packagesPath = path.resolve(__dirname, '../packages');

const dir = process.argv[2];
const pkgJsonPath = path.join(packagesPath, dir, 'tsconfig.json');
const updateState = fs.writeFileSync(pkgJsonPath, JSON.stringify(tsconfigTemplate, null, 2));

if (updateState) throw updateState;
console.log(`[update tsconfig]: update ${dir} tsconfig.json successful!`);
