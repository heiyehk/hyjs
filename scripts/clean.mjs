import path from 'path';
import { rimraf } from 'rimraf';

import packagesPath from './lib/packagesPath.mjs';

const deleteDirName = ['dist', 'lib'];

packagesPath().packagesNamePath.forEach(async (pkgDir) => {
  deleteDirName.forEach(async (dirName) => {
    rimraf(path.join(pkgDir, dirName)).catch((err) => {
      console.log(`[clean message] : clean ${dirName} failed!`);
      console.log(err);
    });
    console.log(`[clean message] : clean ${dirName} successful!`);
  });
});
