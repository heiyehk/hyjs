import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packagesPath = path.resolve(__dirname, '../../packages');

const packages = fs.readdirSync(path.resolve(__dirname, '../../packages'));

export default () => ({
  /** packages路径 */
  packagesPath,
  /** packages 下的文件夹名称 */
  packagesName: packages,
  /** packages 下的文件夹路径 */
  packagesNamePath: packages.map(item => path.join(packagesPath, item))
});
