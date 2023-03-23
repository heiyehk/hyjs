import path from 'path';
import rimraf from 'rimraf';
import packagesPath from './lib/packagesPath.mjs';

const deleteDirName = ['dist', 'lib'];

packagesPath().packagesNamePath.forEach(pkgDir => {
  deleteDirName.forEach((dirName) => {
    rimraf(path.join(pkgDir, dirName), (err) => {
      if (err) throw err;
      console.log(`[clean message] : clean ${dirName} successful!`);
    });
  });
})
