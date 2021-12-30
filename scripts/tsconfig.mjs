import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packages = fs.readdirSync(path.resolve(__dirname, '../packages'));

const tsconfigTemplate = {
  extends: '../../tsconfig.json',
  compilerOptions: {
    outDir: './lib',
    rootDir: 'src'
  },
  exclude: ['node_modules', 'dist']
};

console.log('\n');
packages.forEach((key) => {
  const pkgTsconfigDir = path.join(__dirname, `../packages/${key}/tsconfig.json`);
  const generateSuccess = fs.writeFileSync(
    pkgTsconfigDir,
    JSON.stringify(tsconfigTemplate, null, 2)
  );

  if (generateSuccess) throw generateSuccess;
  console.log(`[create tsconfig]: generate ${key} tsconfig.json successful!`);
});
console.log('\n');
